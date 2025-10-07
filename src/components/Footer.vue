<script setup>
import { Facebook, Linkedin } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import FullLogoIcon from '../icons/FullLogoIcon.vue';

const router = useRouter();
const authStore = useAuthStore();

const accordions = ref({
  menu: false,
  about: false,
  contact: false,
});

// Navigation functions based on user role
const navigateToHome = () => {
  if (authStore.isAuthenticated) {
    if (authStore.isMember()) {
      router.push('/');
    } else if (authStore.isPartnerOrAdmin()) {
      router.push('/homepartner');
    } else {
      router.push('/');
    }
  } else {
    router.push('/');
  }
};

const navigateToCategory = () => {
  router.push('/category');
};

const navigateToStores = () => {
  router.push('/partnerstores');
};

const navigateToProfile = () => {
  if (authStore.isAuthenticated) {
    if (authStore.isMember()) {
      router.push('/profilemember');
    } else if (authStore.isPartnerOrAdmin()) {
      router.push('/profilepartner');
    } else {
      router.push('/profilemember');
    }
  } else {
    router.push('/login');
  }
};
</script>

<template>
  <footer class="bg-[#184c36] relative text-white pt-12 pb-6 px-4 overflow-hidden">
    <!-- Wave background -->
    <div class="absolute left-0 bottom-0 w-full h-32 pointer-events-none select-none z-0">
      <svg viewBox="0 0 1440 320" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0e2d1e" fill-opacity="1"
          d="M0,224L60,202.7C120,181,240,139,360,133.3C480,128,600,160,720,186.7C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
        </path>
      </svg>
    </div>
    <div class="max-w-full mx-5 relative z-10">
      <!-- Accordion (md ลงไป) -->
      <div class="md:hidden">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <FullLogoIcon class="w-32 h-12" />
        </div>
        <div class="border-b border-[#b6e388]">
          <button class="w-full flex justify-between items-center py-4 font-bold focus:outline-none"
            @click="accordions.menu = !accordions.menu">
            <span>เมนู</span>
            <svg class="w-5 h-5 transition-transform" :class="{'rotate-180': accordions.menu}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <transition name="fade">
            <ul v-if="accordions.menu" class="pb-4 pl-2 text-white">
              <li class="py-1 cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToHome">หน้าหลัก</li>
              <li class="py-1 cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToCategory">หมวดหมู่สินค้า</li>
              <li class="py-1 cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToStores">ร้านค้า</li>
              <li class="py-1 cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToProfile">การตั้งค่าบัญชี</li>
            </ul>
          </transition>
        </div>
        <div class="border-b border-[#b6e388]">
          <button class="w-full flex justify-between items-center py-4 font-bold focus:outline-none"
            @click="accordions.about = !accordions.about">
            <span>เกี่ยวกับเว็บไซต์</span>
            <svg class="w-5 h-5 transition-transform" :class="{'rotate-180': accordions.about}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <transition name="fade">
            <ul v-if="accordions.about" class="pb-4 pl-2 text-white">
              <li class="py-1">จองคิว</li>
              <li class="py-1">ข่าวสารและกิจกรรม</li>
            </ul>
          </transition>
        </div>
        <div class="border-b border-[#b6e388]">
          <button class="w-full flex justify-between items-center py-4 font-bold focus:outline-none"
            @click="accordions.contact = !accordions.contact">
            <span>ติดต่อ</span>
            <svg class="w-5 h-5 transition-transform" :class="{'rotate-180': accordions.contact}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <transition name="fade">
            <ul v-if="accordions.contact" class="pb-4 pl-2 text-white">
              <li class="py-1">063-1427649</li>
              <li class="py-1">cstonlineweb@gmail.com</li>
              <li class="flex gap-4 mt-2">
                <a href="#" class="text-white"><Facebook class="w-7 h-7" /></a>
                <a href="#" class="text-white"><Linkedin class="w-7 h-7" /></a>
              </li>
            </ul>
          </transition>
        </div>
      </div>
      <!-- Grid (md ขึ้นไป) -->
      <div class="hidden md:grid grid-cols-4 gap-8">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8 md:mb-0">
          <FullLogoIcon class="w-40 h-14" />
        </div>
        <!-- เมนู -->
        <div class="flex flex-col mb-8 md:mb-0 items-center md:items-start">
          <span class="font-bold mb-2">เมนู</span>
          <ul class="space-y-1 text-sm">
            <li class="cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToHome">หน้าหลัก</li>
            <li class="cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToCategory">หมวดหมู่สินค้า</li>
            <li class="cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToStores">ร้านค้า</li>
            <li class="cursor-pointer hover:text-[#b6e388] transition-colors" @click="navigateToProfile">การตั้งค่าบัญชี</li>
          </ul>
        </div>
        <!-- เกี่ยวกับเว็บไซต์ -->
        <div class="flex flex-col mb-8 md:mb-0 items-center md:items-start">
          <span class="font-bold mb-2">เกี่ยวกับเว็บไซต์</span>
          <ul class="space-y-1 text-sm">
            <li>จองคิว</li>
            <li>ข่าวสารและกิจกรรม</li>
          </ul>
        </div>
        <!-- ติดต่อ -->
        <div class="flex flex-col items-center md:items-start">
          <span class="font-bold mb-2">ติดต่อ</span>
          <ul class="space-y-1 text-sm mb-4">
            <li>063-1427649</li>
            <li>cstonlineweb@gmail.com</li>
            <li class="flex gap-4 mt-2">
              <a href="#" class="text-white"><Facebook class="w-7 h-7" /></a>
              <a href="#" class="text-white"><Linkedin class="w-7 h-7" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>