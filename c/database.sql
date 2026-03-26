-- ============================================
-- CLEANUP: Drop all existing policies and tables
-- ============================================

-- Drop storage policies first
DROP POLICY IF EXISTS "Users can upload shop images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own shop images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own shop images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view shop images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads to shop-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own files" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own files" ON storage.objects;
DROP POLICY IF EXISTS "Enable all operations for authenticated users on shop-images" ON storage.objects;
DROP POLICY IF EXISTS "Enable read access for all users on shop-images" ON storage.objects;

-- Drop table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own shops" ON public.shops;
DROP POLICY IF EXISTS "Users can insert their own shops" ON public.shops;
DROP POLICY IF EXISTS "Users can update their own shops" ON public.shops;
DROP POLICY IF EXISTS "Users can delete their own shops" ON public.shops;

-- Drop triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_shops_updated_at ON public.shops;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop tables (in correct order to avoid foreign key violations)
DROP TABLE IF EXISTS public.shops;
DROP TABLE IF EXISTS public.users;

-- ============================================
-- DATABASE SCHEMA SETUP
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shops table
CREATE TABLE IF NOT EXISTS public.shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    shop_image_url TEXT,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shops_user_id ON public.shops(user_id);
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON public.users(auth_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shops_updated_at 
    BEFORE UPDATE ON public.shops 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR TABLES
-- ============================================

-- RLS Policies for users
CREATE POLICY "Users can view their own profile" 
    ON public.users FOR SELECT 
    USING (auth.uid() = auth_id);

CREATE POLICY "Users can update their own profile" 
    ON public.users FOR UPDATE 
    USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert their own profile" 
    ON public.users FOR INSERT 
    WITH CHECK (auth.uid() = auth_id);

-- RLS Policies for shops
CREATE POLICY "Users can view their own shops" 
    ON public.shops FOR SELECT 
    USING (user_id IN (SELECT id FROM public.users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can insert their own shops" 
    ON public.shops FOR INSERT 
    WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update their own shops" 
    ON public.shops FOR UPDATE 
    USING (user_id IN (SELECT id FROM public.users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can delete their own shops" 
    ON public.shops FOR DELETE 
    USING (user_id IN (SELECT id FROM public.users WHERE auth_id = auth.uid()));

-- ============================================
-- USER CREATION TRIGGER
-- ============================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (auth_id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================

-- Create or update the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'shop-images', 
    'shop-images', 
    true,  -- public bucket
    5242880,  -- 5MB limit (5 * 1024 * 1024)
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif']::text[]  -- allowed mime types
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif']::text[];

-- ============================================
-- STORAGE POLICIES (Working Version)
-- ============================================

-- Policy 1: Allow authenticated users to upload ANY file to shop-images bucket
-- This uses a simple check without owner restrictions for uploads
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
WITH CHECK (
    auth.role() = 'authenticated' 
    AND bucket_id = 'shop-images'
);

-- Policy 2: Allow users to update their own files based on folder name
-- This checks that the first folder in the path matches their user ID
CREATE POLICY "Allow users to update their own images"
ON storage.objects
FOR UPDATE
USING (
    auth.role() = 'authenticated' 
    AND bucket_id = 'shop-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 3: Allow users to delete their own files based on folder name
CREATE POLICY "Allow users to delete their own images"
ON storage.objects
FOR DELETE
USING (
    auth.role() = 'authenticated' 
    AND bucket_id = 'shop-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 4: Allow public to view all images in shop-images bucket
CREATE POLICY "Allow public to view images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'shop-images');

-- ============================================
-- ADDITIONAL HELPER FUNCTIONS
-- ============================================

-- Function to get user ID from auth ID (useful for RLS)
CREATE OR REPLACE FUNCTION public.get_user_id_from_auth_id()
RETURNS UUID AS $$
    SELECT id FROM public.users WHERE auth_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to check if a file belongs to the current user
CREATE OR REPLACE FUNCTION public.check_file_ownership(file_path TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (storage.foldername(file_path))[1] = auth.uid()::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'shops');

-- Check if storage bucket was created with correct settings
SELECT 
    id, 
    name, 
    public, 
    file_size_limit, 
    allowed_mime_types 
FROM storage.buckets 
WHERE id = 'shop-images';

-- Check storage policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Check if RLS is enabled on storage.objects
SELECT 
    relname as table_name,
    relrowsecurity as rls_enabled
FROM pg_class
WHERE relname = 'objects'
AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'storage');

-- Check if all required tables exist
SELECT 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') as users_table_exists,
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shops' AND table_schema = 'public') as shops_table_exists;

-- Count existing shops (should be 0 after cleanup)
SELECT COUNT(*) as shop_count FROM public.shops;

-- Count existing users (should be based on your auth users)
SELECT COUNT(*) as user_count FROM public.users;