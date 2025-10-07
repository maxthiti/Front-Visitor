<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-emerald-700 to-lime-200 relative overflow-hidden flex items-center justify-center">

    <div class="stars absolute inset-0 z-0">
      <div v-for="star in stars" :key="`star-${star.id}`" class="star absolute rounded-full bg-white bg-opacity-70"
        :style="{
          width: `${star.width}px`,
          height: `${star.height}px`,
          left: `${star.left}%`,
          top: `${star.top}%`,
          animationDelay: `${star.delay}s`,
          animationDuration: `${star.duration}s`,
        }"></div>
    </div>

    <div class="floating-circles absolute inset-0 overflow-hidden z-0">
      <div v-for="circle in circles" :key="`circle-${circle.id}`"
        class="circle absolute rounded-full bg-white bg-opacity-10" :style="{
          width: `${circle.width}px`,
          height: `${circle.height}px`,
          left: `${circle.left}%`,
          top: `${circle.top}%`,
          animationDelay: `${circle.delay}s`,
          animationDuration: `${circle.duration}s`,
        }"></div>
    </div>


    <div class="relative z-10 max-w-md w-full p-4">
      <div class="bg-white bg-opacity-50 rounded-2xl shadow-xl p-8 animate-fadeIn backdrop-blur-xl">
        <div class="flex justify-center">
          <div class="pulse-animation">
            <FullLogoIcon class="w-40 h-16" />
          </div>
        </div>

        <div class="mt-6">
          <p class="font-bold text-center text-3xl text-[#184c36]">เข้าสู่ระบบ</p>
        </div>

        <!-- <div class="mt-6 flex justify-center gap-2">
          <button :class="['px-4 py-2 rounded-lg font-bold transition', loginMode==='user' ? 'bg-[#b6e388] text-[#184c36] shadow' : 'bg-white text-[#184c36] border border-[#b6e388]']" @click="loginMode='user'">ผู้ใช้ทั่วไป</button>
          <button :class="['px-4 py-2 rounded-lg font-bold transition', loginMode==='partner' ? 'bg-[#b6e388] text-[#184c36] shadow' : 'bg-white text-[#184c36] border border-[#b6e388]']" @click="loginMode='partner'">พาร์ทเนอร์</button>
        </div> -->
        <div class="mt-6">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">ชื่อผู้ใช้ / Username</span>
            </div>
            <input v-model="username" type="text" placeholder="ชื่อผู้ใช้ / Username"
              class="input input-bordered w-full focus:border-[#b6e388] focus:ring focus:ring-[#b6e388] focus:ring-opacity-50" />
          </label>
          <label class="form-control w-full mt-4">
            <div class="label">
              <span class="label-text">รหัสผ่าน / Password</span>
            </div>
            <input v-model="password" type="password" placeholder="รหัสผ่าน / Password"
              class="input input-bordered w-full focus:border-[#b6e388] focus:ring focus:ring-[#b6e388] focus:ring-opacity-50" 
              @keyup.enter="login"/>
          </label>
          <!-- ปุ่มเข้าสู่ระบบแบบ glassmorphism เหมือนแก้ว (div) -->
          <div
            class="glass-btn relative flex items-center justify-center gap-2 w-full px-8 py-3 rounded-xl font-extrabold text-base text-gray-400 transition overflow-hidden group mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl"
            @click="login" role="button" tabindex="0">
            <span class="z-10">เข้าสู่ระบบ</span>
          </div>

          <div class="divider">หรือ</div>

          <!-- ปุ่มสมัครสมาชิก -->
          <div
            class="glass-btn relative flex items-center justify-center gap-2 w-full px-8 py-3 rounded-xl font-extrabold text-base text-green-900 transition overflow-hidden group mt-2 bg-gradient-to-r from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 shadow-lg hover:shadow-xl bg-opacity-80"
            @click="goToRegister">
            <span class="z-10">สมัครสมาชิก</span>
          </div>
          <!-- ปุ่มสมัครสมาชิกพาร์ทเนอร์ -->
          <div
            class="glass-btn relative flex items-center justify-center gap-2 w-full px-8 py-3 rounded-xl font-extrabold text-base text-green-900 transition overflow-hidden group mt-2 bg-gradient-to-r from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 shadow-lg hover:shadow-xl bg-opacity-80"
            @click="goToRegisterPartner">
            <span class="z-10">สมัครสมาชิกพาร์ทเนอร์</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FullLogoIcon } from '../icons'

const router = useRouter()
const authStore = useAuthStore()

const loginMode = ref('user') // 'user' หรือ 'partner'
const email = ref('')
const username = ref('')
const password = ref('')

const stars = ref([]);
const circles = ref([]);

const login = async () => {
  if (!username.value || !password.value) {
    await Swal.fire({
      icon: 'error',
      title: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน',
      confirmButtonText: 'ตกลง'
    });
    return
  }
  try {
    const url = `${import.meta.env.VITE_API_URL}/login`;
    const response = await axios.post(url, {
      username: username.value,
      password: password.value
    })
    const userData = response.data.user;
    const token = response.data.token;

    if (response.data.success) {
      await Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        showConfirmButton: false,
        timer: 1200
      });
      // ส่ง token ไปด้วย
      authStore.login({ ...userData, token });

      // จัดการ localStorage และ navigation ตาม role
      if (userData.role === 'admin' || userData.userType === 'admin') {
        localStorage.setItem('admin', JSON.stringify(userData));
        localStorage.removeItem('user');
        localStorage.removeItem('partner');
        router.push('/admin/dashboard');
      } else if (userData.role === 'partner' || userData.userType === 'partner') {
        localStorage.setItem('partner', JSON.stringify(userData));
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        router.push('/homepartner');
      } else if (userData.role === 'member' || userData.userType === 'member') {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.removeItem('partner');
        localStorage.removeItem('admin');
        router.push('/');
      } else {
        // กรณี role อื่นๆ หรือไม่ระบุ
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.removeItem('partner');
        localStorage.removeItem('admin');
        router.push('/');
      }

      username.value = ''
      password.value = ''
    }
  } catch (error) {
    if (error.response) {
      // จัดการ error ตาม status code
      let icon = 'error';
      let title = 'เข้าสู่ระบบไม่สำเร็จ';
      let text = error.response.data.error || error.response.statusText;

      if (error.response.status === 403) {
        icon = 'warning';
        title = 'ไม่สามารถเข้าสู่ระบบได้';
        text = error.response.data.error || 'บัญชีของคุณถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ';
      } else if (error.response.status === 401) {
        title = 'ข้อมูลไม่ถูกต้อง';
        text = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
      }

      await Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText: 'ตกลง'
      });
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.message,
        confirmButtonText: 'ตกลง'
      });
    }
  }
}

const goToRegister = () => {
  router.push('/register')
}

const goToRegisterPartner = () => {
  router.push('/registerpartner')
}

onMounted(() => {
  const usedStarPositions = [];
  const usedCirclePositions = [];

  // ฟังก์ชันสุ่มตำแหน่งโดยเว้นระยะห่างขั้นต่ำ
  function getRandomPosition(existing, minDistance = 5) {
    let left, top;
    let tries = 0;
    do {
      left = Math.random() * 100;
      top = Math.random() * 100;
      tries++;
    } while (
      existing.some(p => Math.abs(p.left - left) < minDistance && Math.abs(p.top - top) < minDistance)
      && tries < 100
    );
    return { left, top };
  }

  // สร้างดาว (100 ดวง)
  for (let i = 0; i < 100; i++) {
    const { left, top } = getRandomPosition(usedStarPositions, 3);
    usedStarPositions.push({ left, top });
    stars.value.push({
      id: i,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left,
      top,
      delay: Math.random() * 8,
      duration: 5 + Math.random() * 5,
    });
  }

  for (let i = 0; i < 15; i++) {
    const size = 50 + Math.random() * 100; // สุ่มขนาดเดียว
    circles.value.push({
      id: i,
      width: size,
      height: size,
      left: Math.random() * 100,
      top: 100 + Math.random() * 50,
      delay: Math.random() * 10,
      duration: 40 + Math.random() * 25,
    });
  }

});
</script>

<style scoped>
@keyframes twinkle {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}

.star {
  animation: twinkle 5s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0vh) translateX(0);
  }

  100% {
    transform: translateY(-200vh) translateX(0);
  }
}

.circle {
  animation: float 60s infinite linear;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.7);
  }

  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 204, 0, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 204, 0, 0);
  }
}

.pulse-animation {
  animation: pulse 3s infinite;
}

.label {
  padding: 0.5rem 0;
}

.label-text {
  font-weight: 600;
  color: #184c36;
}

.input,
.select,
.textarea {
  border: 1px solid #b6e388;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  background: #f7faf7;
  color: #184c36;
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: #184c36;
  box-shadow: 0 0 0 3px rgba(182, 227, 136, 0.2);
}

.btn {
  transition: all 0.2s ease-in-out;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: #b6e388;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e6e6e6;
}

.divider::before {
  margin-right: 1rem;
}

.divider::after {
  margin-left: 1rem;
}

/* เพิ่มในส่วน style scoped */
.form-control {
  margin-bottom: 0.5rem;
  /* ปรับระยะห่างระหว่างฟิลด์ */
}

.label {
  padding: 0.25rem 0;
  /* ปรับขนาด padding ของ label */
}

.input,
.select,
.textarea {
  margin-top: 0.25rem;
  /* ปรับระยะห่างด้านบนของ input */
}

/* ปรับระยะห่างของ grid จังหวัด/อำเภอ/ตำบล */
.grid-cols-3 {
  gap: 0.5rem;
}

.glass-btn {
  background: linear-gradient(135deg, rgba(182, 227, 136, 0.25) 0%, rgba(236, 255, 236, 0.45) 100%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 0 0 rgba(255, 255, 255, 0.7) inset;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: relative;
}

.glass-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(182, 227, 136, 0.15) 100%);
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
}

.glass-btn:hover {
  background: linear-gradient(135deg, rgba(182, 227, 136, 0.45) 0%, rgba(236, 255, 236, 0.65) 100%);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.18), 0 1.5px 0 0 rgba(255, 255, 255, 0.7) inset;
}
</style>