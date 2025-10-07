import { defineStore } from "pinia";
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import router from "../routes";

export const useAuthStore = defineStore("auth", () => {
    const user = ref({
        id: null,
        title: "",
        fullName: "",
        username: "",
        role: "",
        partnerId: "",
    });

    const token = ref(localStorage.getItem("token") || null);
    const isAuthenticated = ref(!!token.value);

    // ใช้ key แยกตาม role
    const getStorageKey = (role) => {
        if (role === "admin") return "admin";
        if (role === "partner" || role === "shop") return "partner";
        if (role === "member") return "user";
        if (role === "employee") return "employee";
        return null;
    };

    const initializeAuth = () => {
        let savedUser = null;
        let key = null;
        if (localStorage.getItem("admin")) {
            savedUser = localStorage.getItem("admin");
            key = "admin";
        } else if (localStorage.getItem("partner")) {
            savedUser = localStorage.getItem("partner");
            key = "partner";
        } else if (localStorage.getItem("user")) {
            savedUser = localStorage.getItem("user");
            key = "user";
        } else if (localStorage.getItem("employee")) {
            savedUser = localStorage.getItem("employee");
            key = "employee";
        }
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            try {
                const parsedUser = JSON.parse(savedUser);
                if (!parsedUser.role) {
                    localStorage.removeItem(key);
                    localStorage.removeItem("token");
                    isAuthenticated.value = false;
                    return false;
                }
                isAuthenticated.value = true;
                user.value = parsedUser;
                token.value = savedToken;
                return true;
            } catch (error) {
                localStorage.removeItem(key);
                localStorage.removeItem("token");
                isAuthenticated.value = false;
                return false;
            }
        } else {
            isAuthenticated.value = false;
        }
        return false;
    };

    function login(userData) {
        try {
            console.log('Auth store login called with:', userData);

            if (!userData) {
                console.error("Invalid login data:", userData);
                throw new Error("Invalid login response");
            }

            // เช็ค status ก็ต่อเมื่อ role === 'partner'
            if (userData.status === "รอยืนยัน" || userData.status === "ไม่ยืนยัน") {
                Swal.fire({
                    title: "การเข้าถึงถูกปฏิเสธ",
                    text: 'สถานะของคุณคือ "รอยืนยัน" กรุณารอการยืนยันจากเจ้าหน้าที่',
                    icon: "warning",
                    confirmButtonText: "ตกลง",
                }).then(() => {
                    logout();
                });
                return false;
            }

            // แมปข้อมูล user ให้ตรงกับ response ที่คาดไว้
            const userObj = {
                id: userData._id || null,
                partnerId: userData.partnerId || null,
                title: userData.title || "",
                fullName: userData.fullName || "",
                username: userData.username || "",
                role: userData.role || "",
                personalPhone: userData.personalPhone || "",
                personalEmail: userData.personalEmail || "",
            };

            user.value = userObj;
            token.value = userData.token || null;

            console.log('Setting auth state:', { userObj, token: token.value, isAuthenticated: !!(token.value && userObj.role) });

            // เก็บลง localStorage ตาม role
            const key = getStorageKey(userObj.role);
            if (key) {
                localStorage.setItem(key, JSON.stringify(userObj));
                localStorage.setItem("token", token.value);
                console.log('Saved to localStorage:', { key, token: token.value });
            }

            isAuthenticated.value = !!(token.value && userObj.role);

            // แยก routing ตาม role
            switch (userObj.role) {
                case "admin":
                    router.push("/admin/dashboard");
                    break;
                case "member":
                    router.push("/");
                    break;
                case "partner":
                case "shop":
                    router.push("/homepartner");
                    break;
                case "employee":
                    router.push("/");
                    break;
                default:
                    router.push("/");
            }

            return true;
        } catch (error) {
            console.error("Login failed:", error);
            logout();
            return false;
        }
    }

    function logout() {
        // เซ็ต user กลับเป็น object ว่าง ไม่ใช่ null
        user.value = {
            id: null,
            title: "",
            fullName: "",
            username: "",
            role: "",
            partnerId: "",
        };
        token.value = null;
        isAuthenticated.value = false;

        // ลบทุก key ที่เกี่ยวข้อง
        localStorage.removeItem("user");
        localStorage.removeItem("partner");
        localStorage.removeItem("admin");
        localStorage.removeItem("employee");
        localStorage.removeItem("token");
        router.push("/");
    }

    // ฟังก์ชันตรวจสอบสิทธิ์การเข้าถึง
    function hasRole(requiredRole) {
        return user.value.role === requiredRole;
    }

    const isPartner = computed(() => {
        return user.value.role === "partner" || user.value.role === "shop";
    });

    // ฟังก์ชันตรวจสอบว่าเป็น admin
    function isAdmin() {
        return user.value.role === "admin";
    }

    // ฟังก์ชันตรวจสอบว่าเป็น member
    function isMember() {
        return user.value.role === "member";
    }

    // ฟังก์ชันตรวจสอบว่าเป็น employee
    function isEmployee() {
        return user.value.role === "employee";
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        initializeAuth,
        hasRole,
        isPartner,
        isAdmin,
        isMember,
        isEmployee,
    };
});
