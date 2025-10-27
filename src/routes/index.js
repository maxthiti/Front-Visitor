import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import RegisterMember from "../views/Login.vue";
import ResidentCar from "../views/Resident/ResidentCar.vue";
import Visitor from "../views/Visitor/Visitor.vue";
import History from "../views/Historylog/Historylog.vue";
import HomeLayout from "../views/Home.vue";

const routes = [
  { 
    path: "/", 
    component: RegisterMember,
  },
  {
    path: "/home",
    component: HomeLayout,
    redirect: "/resident-car",
    meta: { requiresAuth: true },
    children:[
      { path: "/resident-car", component: ResidentCar, meta: { requiresAuth: true } },
      { path: "/visitor", component: Visitor, meta: { requiresAuth: true } },
      { path: "/history", component: History, meta: { requiresAuth: true } },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (!authStore.isAuthenticated && localStorage.getItem("token")) {
    const initialized = authStore.initializeAuth();
    if (initialized) {
      console.log("Auth store initialized successfully");
    } else {
      console.log("Auth store initialization failed");
    }
  }
  
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      next('/home');
      return;
    }
    
    // if (to.meta.roles && to.meta.roles.length > 0) {
    //   const userRole = authStore.user.role;
      
    //           if (!to.meta.roles.includes(userRole)) {
    //       console.log("Role not allowed, redirecting");
    //       if (authStore.isAdmin()) {
    //         next('/admin/dashboard');
    //       } else if (authStore.isMember()) {
    //         next('/');
    //       } else if (authStore.isPartnerOrAdmin()) {
    //         next('/dashboardpartner');
    //       }
    //       return;
    //     }
    // }
  }
  
  next();
});

export default router;
