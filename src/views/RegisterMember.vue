<template>
	<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
		<div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
			<div class="flex flex-col items-center mb-6">
				<h2 class="text-3xl font-bold text-green-700 mb-2">สมัครสมาชิกลูกบ้าน</h2>
				<p class="text-gray-500">กรอกข้อมูลเพื่อสมัครสมาชิก</p>
			</div>
			<form @submit.prevent="register" class="space-y-5">
				<div>
					<label class="block mb-1 font-semibold text-gray-700">เจ้าของบ้าน</label>
					<input v-model="name" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" required />
				</div>
				<div>
					<label class="block mb-1 font-semibold text-gray-700">เลขที่บ้าน</label>
					<input v-model="address" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" required />
				</div>
				<button type="submit" class="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-bold shadow hover:scale-105 transition">สมัครสมาชิก</button>
				<div v-if="message" class="mt-4 text-center text-green-600 animate-bounce">{{ message }}</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			address: '',
			message: ''
		}
	},
	methods: {
			register() {
				// ไปหน้า ResidentCar
				localStorage.setItem('residentName', this.name);
				this.$router.push({
					path: '/resident-car',
					// query: { name: this.name }
				});
			}
	}
}
</script>

<style>
.min-h-screen {
	min-height: 100vh;
}
.shadow-xl {
	box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}
.animate-bounce {
	animation: bounce 1s infinite;
}
@keyframes bounce {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-8px); }
}
</style>