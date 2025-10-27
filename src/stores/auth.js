// stores/auth.js (ตัวอย่าง)
// สมมติว่าคุณมีไฟล์ api/index.js ที่มี export Axios instance

import { defineStore } from 'pinia';
import axios from 'axios'; // สมมติว่าใช้ Axios

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
        isAuthenticated: !!localStorage.getItem('token'),
    }),
    actions: {
        logout() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },

        async initializeAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                this.logout();
                return false;
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                const response = await axios.get('/api/user/me'); 
                
                this.user = response.data.user; 
                this.isAuthenticated = true;
                return true;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Token expired or invalid during initialization.");
                }
                this.logout();
                return false;
            }
        },
    }
});