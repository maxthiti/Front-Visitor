<template>
    <div>
        <div class="flex items-center px-6 py-4 bg-white shadow-sm justify-between">
            <button class="mr-6 focus:outline-none" @click="toggleSidebar">
                <svg width="28" height="28" fill="none" stroke="currentColor">
                    <line x1="6" y1="8" x2="22" y2="8" stroke-width="2" />
                    <line x1="6" y1="14" x2="22" y2="14" stroke-width="2" />
                    <line x1="6" y1="20" x2="22" y2="20" stroke-width="2" />
                </svg>
            </button>
            <div class="flex items-center">
                <div
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center mr-6">
                    <slot name="avatar"></slot>
                </div>
                <span class="font-bold text-xl text-green-700">
                    <slot name="name">ชื่อผู้ใช้</slot>
                </span>
            </div>
        </div>
        <transition class="rounded-r-xl p-2" name="slide">
            <div v-if="sidebarOpen"
                class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col pt-16 px-2 animate-slidein">
                <div class="absolute top-4 left-4 font-bold text-green-700 text-2xl">เมนู</div>
                <button class="absolute top-4 right-4 text-gray-500" @click="toggleSidebar">✕</button>
                <nav class="flex flex-col gap-6 shadow-sm rounded-xl p-4 bg-gray-100 min-h-full justify-between">
                    <div class="flex flex-col gap-3">
                        <a href="/resident-car" :class="menuClass('/resident-car')">ทะเบียนรถลูกบ้าน</a>
                        <a href="/visitor-history" :class="menuClass('/visitor-history')">ประวัติผู้มาเยือน</a>
                    </div>
                    <button @click="logout" class="font-bold text-sm px-2 py-2 rounded transition w-full mt-8 bg-red-100 text-red-600 hover:bg-red-200">ออกจากระบบ</button>
                </nav>
            </div>
        </transition>
        <div v-if="sidebarOpen" class="fixed inset-0 bg-black bg-opacity-30 z-40" @click="toggleSidebar"></div>
    </div>
</template>

<script>
export default {
    name: 'Bar',
    data() {
        return {
            sidebarOpen: false
        }
    },
    computed: {
        currentPath() {
            return this.$route.path;
        }
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        menuClass(path) {
            return [
                'font-bold text-sm px-2 py-2 rounded transition',
                this.currentPath === path ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white shadow' : 'text-black hover:text-blue-600'
            ];
        },
        logout() {
            localStorage.removeItem('residentName');
            this.$router.push({ path: '/' });
            this.sidebarOpen = false;
        }
    }
}
</script>

<style scoped>
.bg-gradient-to-br {
    background: linear-gradient(135deg, #c6f6d5 0%, #bee3f8 100%);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s, opacity 0.3s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.animate-slidein {
    animation: slidein 0.3s;
}

@keyframes slidein {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
