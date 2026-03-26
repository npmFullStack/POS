import { supabase } from "../lib/supabase.js";

export const authService = {
  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email))
      return "Please enter a valid email address (e.g., name@example.com)";
    return null;
  },

  /**
   * Validate password
   */
  validatePassword(password) {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  },

  /**
   * Sign up with email and password
   */
  async signUp(email, password, firstName, lastName) {
    try {
      // Validate inputs
      const emailError = this.validateEmail(email);
      if (emailError) {
        return { success: false, error: emailError };
      }

      const passwordError = this.validatePassword(password);
      if (passwordError) {
        return { success: false, error: passwordError };
      }

      if (!firstName || !lastName) {
        return {
          success: false,
          error: "First name and last name are required",
        };
      }

      console.log("Attempting signup with:", { email, firstName, lastName });

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error("Supabase signup error:", error);

        // Handle specific error cases
        if (error.message.includes("already registered")) {
          return {
            success: false,
            error: "This email is already registered. Please sign in instead.",
          };
        }
        if (error.message.includes("password")) {
          return {
            success: false,
            error: "Password must be at least 6 characters",
          };
        }

        return { success: false, error: error.message };
      }

      console.log("Signup successful:", data);

      // Check if email confirmation is required
      if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        return {
          success: false,
          error: "This email is already registered. Please sign in instead.",
        };
      }

      if (data.user && data.user.confirmed_at === null) {
        return {
          success: true,
          data,
          requiresConfirmation: true,
          message:
            "Please check your email to confirm your account before signing in.",
        };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        error: error.message || "Failed to create account",
      };
    }
  },

  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    try {
      // Validate inputs
      const emailError = this.validateEmail(email);
      if (emailError) {
        return { success: false, error: emailError };
      }

      const passwordError = this.validatePassword(password);
      if (passwordError) {
        return { success: false, error: passwordError };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        console.error("Sign in error:", error);

        if (error.message.includes("Invalid login credentials")) {
          return { success: false, error: "Invalid email or password" };
        }
        if (error.message.includes("Email not confirmed")) {
          return {
            success: false,
            error: "Please confirm your email address before signing in",
          };
        }

        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message || "Failed to sign in" };
    }
  },

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Google sign in error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Google sign in error:", error);
      return {
        success: false,
        error: error.message || "Failed to sign in with Google",
      };
    }
  },

  /**
   * Sign out
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;

      if (user) {
        // Get user profile from users table
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Profile fetch error:", profileError);
        }

        return {
          success: true,
          user: {
            ...user,
            profile: profile || null,
          },
        };
      }

      return { success: true, user: null };
    } catch (error) {
      console.error("Get current user error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return { success: true, isAuthenticated: !!session };
    } catch (error) {
      console.error("Check auth error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Resend confirmation email
   */
  async resendConfirmationEmail(email) {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Resend email error:", error);
      return { success: false, error: error.message };
    }
  },
};
