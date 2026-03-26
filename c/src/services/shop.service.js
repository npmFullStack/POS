import { supabase } from "../lib/supabase.js";

export const shopService = {
  /**
   * Create a new shop
   */
  async createShop(shopData, userId) {
    try {
      // Upload image if exists
      let imageUrl = null;
      if (shopData.shopImage) {
        const uploadResult = await this.uploadShopImage(
          shopData.shopImage,
          userId,
        );
        if (uploadResult.success) {
          imageUrl = uploadResult.url;
        } else {
          // If upload fails, return the error
          return { success: false, error: uploadResult.error };
        }
      }

      const { data, error } = await supabase
        .from("shops")
        .insert({
          name: shopData.name,
          address: shopData.address,
          shop_image_url: imageUrl,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Create shop error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get user's shops
   */
  async getUserShops(userId) {
    try {
      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Mark active shop
      const activeShopId = localStorage.getItem("activeShopId");
      const shopsWithActive = data.map((shop) => ({
        ...shop,
        isActive: shop.id === activeShopId,
      }));

      return { success: true, data: shopsWithActive };
    } catch (error) {
      console.error("Get user shops error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all user shops (raw data without active flag)
   */
  async getAllUserShops(userId) {
    try {
      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Get all user shops error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get active shop
   */
  async getActiveShop(userId) {
    try {
      const activeShopId = localStorage.getItem("activeShopId");

      if (!activeShopId) {
        // Get first shop if no active shop set
        const { data: shops, error: shopsError } = await supabase
          .from("shops")
          .select("*")
          .eq("user_id", userId)
          .limit(1);

        if (shopsError) throw shopsError;

        if (shops && shops.length > 0) {
          localStorage.setItem("activeShopId", shops[0].id);
          return { success: true, data: shops[0] };
        }
        return { success: true, data: null };
      }

      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .eq("id", activeShopId)
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (!data) {
        // If shop doesn't exist or doesn't belong to user, clear storage
        localStorage.removeItem("activeShopId");
        return this.getActiveShop(userId);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Get active shop error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Set active shop
   */
  setActiveShop(shopId) {
    localStorage.setItem("activeShopId", shopId);
    // Dispatch event to notify components about shop change
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("shop-changed"));
    }
    return { success: true };
  },

  /**
   * Upload shop image to Supabase Storage
   */
  async uploadShopImage(file, userId) {
    try {
      // Validate file
      if (!file) {
        return { success: false, error: "No file provided" };
      }

      // Check file size (max 5MB to match bucket limit)
      if (file.size > 5 * 1024 * 1024) {
        return { success: false, error: "File size must be less than 5MB" };
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        return {
          success: false,
          error: "File must be an image (JPEG, PNG, or WebP)",
        };
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const filePath = fileName;

      console.log("Uploading image:", {
        userId,
        fileName,
        filePath,
        bucket: "shop-images",
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        fileType: file.type,
      });

      // Upload to storage
      const { data, error } = await supabase.storage
        .from("shop-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.error("Storage upload error:", error);

        // Provide more helpful error messages
        if (error.message.includes("duplicate")) {
          return {
            success: false,
            error: "An image with this name already exists. Please try again.",
          };
        }

        if (error.message.includes("bucket not found")) {
          return {
            success: false,
            error: "Storage bucket not configured. Please contact support.",
          };
        }

        return { success: false, error: error.message };
      }

      console.log("Upload successful:", data);

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("shop-images").getPublicUrl(filePath);

      console.log("Public URL:", publicUrl);

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error("Upload image error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update shop
   */
  async updateShop(shopId, userId, updates) {
    try {
      const { data, error } = await supabase
        .from("shops")
        .update(updates)
        .eq("id", shopId)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;

      // Dispatch event to notify components about shop update
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("shop-updated"));
      }

      return { success: true, data };
    } catch (error) {
      console.error("Update shop error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete shop
   */
  async deleteShop(shopId, userId) {
    try {
      const { error } = await supabase
        .from("shops")
        .delete()
        .eq("id", shopId)
        .eq("user_id", userId);

      if (error) throw error;

      // Clear active shop if it was deleted
      if (localStorage.getItem("activeShopId") === shopId) {
        localStorage.removeItem("activeShopId");
      }

      // Dispatch event to notify components about shop deletion
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("shop-deleted"));
        window.dispatchEvent(new Event("shop-changed"));
      }

      return { success: true };
    } catch (error) {
      console.error("Delete shop error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete shop image
   */
  async deleteShopImage(imageUrl, userId) {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split("/");
      const filePath = urlParts
        .slice(urlParts.indexOf("shop-images") + 1)
        .join("/");

      // Verify the file belongs to the user
      if (!filePath.startsWith(userId)) {
        return {
          success: false,
          error: "You don't have permission to delete this image",
        };
      }

      const { error } = await supabase.storage
        .from("shop-images")
        .remove([filePath]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Delete image error:", error);
      return { success: false, error: error.message };
    }
  },
};
