<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-emerald-700 to-lime-200 relative overflow-hidden flex items-center justify-center">
    <!-- Background Elements -->
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
    <!-- Main Form -->
    <div class="relative z-10 max-w-md w-full p-4">
      <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-8 animate-fadeIn">
        <div class="flex justify-center">
          <div class="w-20 h-20 rounded-full overflow-hidden pulse-animation">
            <RecycleIcon class="w-full h-full p-1 object-cover" />
          </div>
        </div>
        <div class="mt-6">
          <p class="font-bold text-center text-3xl text-gray-800">
            สมัครสมาชิก
          </p>
        </div>
        <div class="mt-6">
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Username -->
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Username (อย่างน้อย 6 ตัวอักษร)</span>
              </div>
              <input type="text" placeholder="กรุณากรอกชื่อผู้ใช้ (อย่างน้อย 6 ตัวอักษร)"
                class="input input-bordered w-full focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                v-model="form.username" @input="validateUsername" />
              <small v-if="usernameError" class="text-red-500 text-sm">
                {{ usernameError }}
              </small>
            </label>
            <!-- Email -->
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">อีเมล (Email)</span>
              </div>
              <input type="email" placeholder="กรุณากรอกอีเมล"
                class="input input-bordered w-full focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                v-model="form.email" />
            </label>
            <!-- Password -->
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Password (อย่างน้อย 8 ตัวอักษร)</span>
              </div>
              <input type="password" placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
                class="input input-bordered w-full focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                v-model="form.password" @input="validatePassword" />
              <small v-if="passwordError" class="text-red-500 text-sm">
                {{ passwordError }}
              </small>
            </label>
            <!-- Submit Button -->
            <button type="submit"
              class="btn w-full bg-yellow-400 hover:bg-yellow-500 border-none text-gray-800 font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              :disabled="isSubmitting">
              <span v-if="!isSubmitting">สมัครสมาชิก / Register</span>
              <span v-else class="loading loading-spinner"></span>
            </button>
            <div class="divider">หรือ</div>
            <!-- ปุ่มเข้าสู่ระบบ glassmorphism -->
            <div
              class="glass-btn relative flex items-center justify-center gap-2 w-full px-8 py-3 rounded-xl font-extrabold text-green-900 transition overflow-hidden group mt-4"
              @click="goToLogin"
              role="button"
              tabindex="0"
            >
              <span class="z-10">เข้าสู่ระบบ</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from 'sweetalert2';
import { RecycleIcon } from "../../icons";

const router = useRouter();
const stars = ref([]);
const circles = ref([]);

// Form data
const form = ref({
  username: "",
  email: "",
  password: ""
});
const facebookEmail = ref("");
const lineEmail = ref("");
const emailConnected = ref("");

// Error messages
const usernameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const isSubmitting = ref(false);

// Validation functions
const validateUsername = () => {
  const username = form.value.username.trim();
  if (!username) {
    usernameError.value = "กรุณากรอกชื่อผู้ใช้";
    return;
  }
  if (username.length < 6) {
    usernameError.value = "ชื่อผู้ใช้ต้องมีอย่างน้อย 6 ตัวอักษร";
    return;
  }
  usernameError.value = "";
};
// const validateEmail = () => {
//   const email = form.value.email.trim();
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email) {
//     emailError.value = "กรุณากรอกอีเมล";
//     return;
//   }
//   if (!emailRegex.test(email)) {
//     emailError.value = "กรุณากรอกอีเมลที่ถูกต้อง";
//     return;
//   }
//   emailError.value = "";
// };
const validatePassword = () => {
  const password = form.value.password;
  if (!password) {
    passwordError.value = "กรุณากรอกรหัสผ่าน";
    return;
  }
  if (password.length < 8) {
    passwordError.value = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
    return;
  }
  passwordError.value = "";
};

// Social login handlers (mock)
const handleConnectFacebook = () => {
  // ตัวอย่าง: เปิด OAuth popup จริงควรเปลี่ยน URL เป็นของแอปคุณ
  window.open('https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_FB_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email', '_blank', 'width=500,height=600');
  // mock: สมมุติได้อีเมลกลับมา
  setTimeout(() => { facebookEmail.value = "user_facebook@example.com"; }, 1500);
};
const handleConnectLine = () => {
  // ตัวอย่าง: เปิด OAuth popup จริงควรเปลี่ยน URL เป็นของแอปคุณ
  window.open('https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=YOUR_LINE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=profile%20openid%20email', '_blank', 'width=500,height=600');
  // mock: สมมุติได้อีเมลกลับมา
  setTimeout(() => { lineEmail.value = "user_line@example.com"; }, 1500);
};
const handleConnectEmail = () => {
  // ตัวอย่าง: เปิด popup หรือ redirect ไปหน้าเชื่อมต่ออีเมลจริง (OAuth หรือระบบของคุณเอง)
  // ตัวอย่าง mock: ให้กรอกอีเมลใหม่
  const email = prompt('กรุณากรอกอีเมลที่ต้องการผูกบัญชี:');
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailConnected.value = email;
  } else if (email) {
    alert('รูปแบบอีเมลไม่ถูกต้อง');
  }
};

// Form submission
const submitForm = async () => {
  validateUsername();
  validatePassword();
  if (usernameError.value || passwordError.value) {
    return;
  }
  isSubmitting.value = true;
  try {
    Swal.fire({
      title: 'กำลังดำเนินการ...',
      text: 'กำลังส่งข้อมูล กรุณารอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    console.log('Form data:', {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    });
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    });
    Swal.close();
    await Swal.fire({
      icon: 'success',
      title: 'สมัครสมาชิกสำเร็จ!',
      confirmButtonText: 'ตกลง'
    });
    router.push("/login");
  } catch (error) {
    Swal.close();
    await Swal.fire({
      icon: 'error',
      title: 'สมัครสมาชิกไม่สำเร็จ',
      text: error.response?.data?.error || error.message || 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์'
    });
  } finally {
    isSubmitting.value = false;
  }
};
const goToLogin = () => {
  router.push("/login");
};

// Generate random background elements
const generateBackgroundElements = () => {
  const usedStarPositions = [];
  const usedCirclePositions = [];

  function getRandomPosition(existing, minDistance = 5) {
    let left, top;
    let tries = 0;
    do {
      left = Math.random() * 100;
      top = Math.random() * 100;
      tries++;
    } while (
      existing.some(p => Math.abs(p.left - left) < minDistance && Math.abs(p.top - top) < minDistance) &&
      tries < 100
    );
    return { left, top };
  }

  // Create stars
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

  // Create circles
  for (let i = 0; i < 15; i++) {
    const size = 50 + Math.random() * 100;
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
};

// Initialize component
onMounted(() => {
  generateBackgroundElements();
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
  color: #4b5563;
}

.input,
.select,
.textarea {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
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
  color: #9ca3af;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e5e7eb;
}

.divider::before {
  margin-right: 1rem;
}

.divider::after {
  margin-left: 1rem;
}

.form-control {
  margin-bottom: 1.5rem;
  position: relative;
  min-height: 5.5rem;
}

.label {
  padding: 0.25rem 0;
  display: block;
}

.input,
.select,
.textarea {
  margin-top: 0.25rem;
  transition: all 0.2s ease;
  min-height: 2.5rem;
}

.grid-cols-3 {
  gap: 0.5rem;
}

.text-red-500 {
  position: absolute;
  bottom: -1.25rem;
  left: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 0.25rem;
  width: 100%;
}

.has-error {
  border-color: #ef4444;
}

.grid-cols-3 .form-control {
  margin-bottom: 2rem;
  min-height: 6rem;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  margin-top: 2rem;
}

.checkbox-label {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #374151;
}

.checkbox-link {
  color: #ef4444;
  text-decoration: underline;
  cursor: pointer;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  color: #ef4444;
  font-size: 0.75rem;
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
