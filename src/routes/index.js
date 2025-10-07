import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import RegisterMember from "../views/RegisterMember.vue";
import ResidentCar from "../views/ResidentCar.vue";
import VisitorHistory from "../views/VisitorHistory.vue";
import AddVisitor from "../views/AddVisitor.vue";
import Bar from "../components/Bar.vue";

const routes = [

  // { 
  //   path: "/admin/categories", 
  //   component: ManageCategory,
  //   meta: { requiresAuth: true, roles: ['admin'] }
  // },

  // Pos
  // { path: "/pos/buyorder", component: BuyOrder, meta: { requiresAuth: true, roles: ['partner', 'employee'] } },
  // { path: "/pos/sellorder", component: SellOrder, meta: { requiresAuth: true, roles: ['partner', 'employee'] } },
  // { path: "/pos/storeproduct", component: StoreProduct, meta: { requiresAuth: true, roles: ['partner', 'employee'] } },

  { 
    path: "/", 
    component: RegisterMember,
  },
  { path: "/resident-car", component: ResidentCar },
  { path: "/visitor-history", component: VisitorHistory },
  { path: "/add-visitor", component: AddVisitor },
  { path: "/bar", component: Bar },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Initialize auth store ถ้ายังไม่ได้ทำ
  if (!authStore.isAuthenticated && localStorage.getItem("token")) {
    const initialized = authStore.initializeAuth();
    if (initialized) {
      console.log("Auth store initialized successfully");
    } else {
      console.log("Auth store initialization failed");
    }
  }
  
  // ตรวจสอบว่าต้องการ authentication หรือไม่
  if (to.meta.requiresAuth) {
    // ตรวจสอบว่า login แล้วหรือไม่
    if (!authStore.isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      next('/login');
      return;
    }
    
    // ตรวจสอบ role ที่อนุญาต
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = authStore.user.role;
      // console.log("Required roles:", to.meta.roles);
      // console.log("User role:", userRole);
      
              if (!to.meta.roles.includes(userRole)) {
          console.log("Role not allowed, redirecting");
          // ถ้าไม่มีสิทธิ์ ให้ redirect ตาม role
          if (authStore.isAdmin()) {
            next('/admin/dashboard');
          } else if (authStore.isMember()) {
            next('/');
          } else if (authStore.isPartnerOrAdmin()) {
            next('/dashboardpartner');
          }
          return;
        }
    }
  }
  
  next();
});

export default router;
