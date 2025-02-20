import { defineStore } from "pinia";
import { ref } from "vue";
import { isDesktopDevice } from "@/utils/platform";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const userRole = ref(null);

  const login = async (credentials) => {
    try {
      // TODO: Implement actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      user.value = data.user;
      userRole.value = data.role;
      isAuthenticated.value = true;

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    userRole.value = null;
    isAuthenticated.value = false;
  };

  const checkPlatformAccess = () => {
    if (!isAuthenticated.value) return false;

    // Desktop-only features check
    if (userRole.value === "admin" && !isDesktopDevice()) {
      uni.showToast({
        title: "管理功能仅支持在电脑端使用",
        icon: "none",
      });
      return false;
    }

    return true;
  };

  return {
    user,
    userRole,
    isAuthenticated,
    login,
    logout,
    checkPlatformAccess,
  };
});
