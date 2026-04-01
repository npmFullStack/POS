import { supabase } from "../lib/supabase.js";

export const staffService = {
  /**
   * Hash password for storage
   * Note: This is a simple hash for demo. In production, use bcrypt or proper hashing
   * However, since Supabase handles auth, we'll store plain text for staff login demo
   * For production, you should use proper password hashing
   */
  hashPassword(password) {
    // In a real implementation, you would use bcrypt or Supabase's built-in auth
    // For this demo, we're storing as plain text (not recommended for production)
    // This matches the NewStaff.jsx implementation
    return password;
  },

  /**
   * Create a new staff member
   */
  async createStaff(staffData, shopId) {
    try {
      // Check if username already exists
      const { data: existingStaff, error: checkError } = await supabase
        .from("staffs")
        .select("username")
        .eq("username", staffData.username)
        .single();

      if (existingStaff) {
        return { success: false, error: "Username already exists" };
      }

      const { data, error } = await supabase
        .from("staffs")
        .insert({
          shop_id: shopId,
          full_name: staffData.fullName,
          username: staffData.username,
          password_hash: this.hashPassword(staffData.password),
          phone: staffData.phone || null,
          profile_image_url: staffData.profileImageUrl || null,
          status: staffData.status || "active",
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Create staff error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all staff members for a shop
   */
  async getShopStaff(shopId) {
  try {
    console.log("Fetching staff for shop:", shopId);
    
    const { data, error } = await supabase
      .from("staffs")
      .select("*")
      .eq("shop_id", shopId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching staff:", error);
      throw error;
    }

    console.log("Raw staff data from DB:", data);

    // Transform data to match the format expected by Staff.jsx
    const transformedData = data.map((staff) => ({
      id: staff.id,
      fullName: staff.full_name,
      name: staff.full_name,
      username: staff.username,
      phone: staff.phone,
      status: staff.status,
      lastActive: staff.last_active 
        ? this.formatLastActive(staff.last_active)
        : "Never",
      image: staff.profile_image_url,
      createdAt: staff.created_at,
    }));

    console.log("Transformed staff data:", transformedData);

    return { success: true, data: transformedData };
  } catch (error) {
    console.error("Get shop staff error:", error);
    return { success: false, error: error.message };
  }
},

  /**
   * Get staff member by ID
   */
  async getStaffById(staffId) {
    try {
      const { data, error } = await supabase
        .from("staffs")
        .select("*")
        .eq("id", staffId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Get staff by ID error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update staff member
   */
  async updateStaff(staffId, updates) {
    try {
      // If updating username, check for duplicates
      if (updates.username) {
        const { data: existingStaff, error: checkError } = await supabase
          .from("staffs")
          .select("id")
          .eq("username", updates.username)
          .neq("id", staffId)
          .single();

        if (existingStaff) {
          return { success: false, error: "Username already exists" };
        }
      }

      // Prepare update data
      const updateData = {};
      if (updates.fullName) updateData.full_name = updates.fullName;
      if (updates.username) updateData.username = updates.username;
      if (updates.password) updateData.password_hash = this.hashPassword(updates.password);
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.profileImageUrl) updateData.profile_image_url = updates.profileImageUrl;
      if (updates.status) updateData.status = updates.status;

      const { data, error } = await supabase
        .from("staffs")
        .update(updateData)
        .eq("id", staffId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Update staff error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update staff status
   */
  async updateStaffStatus(staffId, status) {
    try {
      const { data, error } = await supabase
        .from("staffs")
        .update({ status })
        .eq("id", staffId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Update staff status error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete staff member
   */
  async deleteStaff(staffId) {
    try {
      const { error } = await supabase
        .from("staffs")
        .delete()
        .eq("id", staffId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Delete staff error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Authenticate staff for public store login
   */
  async authenticateStaff(username, password, shopId) {
    try {
      // Find staff by username and shop
      const { data: staff, error } = await supabase
        .from("staffs")
        .select(`
          id,
          full_name,
          username,
          password_hash,
          shop_id,
          phone,
          profile_image_url,
          status,
          last_active,
          shops:shop_id (
            name
          )
        `)
        .eq("username", username)
        .eq("shop_id", shopId)
        .eq("status", "active")
        .single();

      if (error || !staff) {
        return { success: false, error: "Invalid credentials" };
      }

      // For demo, we're using plain text comparison
      // In production, use proper password hashing (bcrypt)
      if (staff.password_hash !== password) {
        return { success: false, error: "Invalid credentials" };
      }

      // Update last active timestamp
      await supabase
        .from("staffs")
        .update({ last_active: new Date().toISOString() })
        .eq("id", staff.id);

      // Return staff data without password
      const { password_hash, ...staffData } = staff;
      return {
        success: true,
        data: {
          ...staffData,
          shop_name: staff.shops?.name,
        },
      };
    } catch (error) {
      console.error("Authenticate staff error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Upload staff profile image
   */
  async uploadProfileImage(file, staffId, shopId) {
    try {
      // Validate file
      if (!file) {
        return { success: false, error: "No file provided" };
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return { success: false, error: "File size must be less than 5MB" };
      }

      // Check file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return {
          success: false,
          error: "File must be an image (JPEG, PNG, or WebP)",
        };
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `staff/${shopId}/${staffId}/${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload to storage
      const { data, error } = await supabase.storage
        .from("shop-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("shop-images").getPublicUrl(filePath);

      // Update staff with profile image URL
      await this.updateStaff(staffId, { profileImageUrl: publicUrl });

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error("Upload profile image error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Format last active date
   */
  formatLastActive(date) {
    if (!date) return "Never";
    
    const now = new Date();
    const lastActive = new Date(date);
    const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return lastActive.toLocaleDateString();
  },

  /**
   * Get staff statistics for a shop
   */
  async getStaffStats(shopId) {
    try {
      const { data, error } = await supabase
        .from("staffs")
        .select("status")
        .eq("shop_id", shopId);

      if (error) throw error;

      const total = data.length;
      const active = data.filter(s => s.status === "active").length;
      const inactive = data.filter(s => s.status === "inactive").length;
      const pending = data.filter(s => s.status === "pending").length;

      return {
        success: true,
        data: { total, active, inactive, pending },
      };
    } catch (error) {
      console.error("Get staff stats error:", error);
      return { success: false, error: error.message };
    }
  },
};