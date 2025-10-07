<template>
    <div>
        <Bar>
            <template #name>
                คุณ {{ residentName }}
            </template>
        </Bar>
        <div class="max-w-xl mx-auto mt-2 p-6 bg-white rounded-2xl shadow-xl">
            <div class="mb-6 flex items-center">
                <span class="font-bold text-lg">ทะเบียนรถลูกบ้าน</span>
                <button
                    class="ml-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full px-4 py-1 text-lg font-bold text-white shadow hover:scale-105 transition"
                    @click="showPopup = true">+</button>
            </div>
            <div v-if="showPopup"
                class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-3">
                <div class="bg-white p-8 rounded-2xl shadow-xl w-96 animate-fadein">
                    <h3 class="text-xl font-bold mb-6 text-green-700 text-center">เพิ่มทะเบียนรถ</h3>
                    <form @submit.prevent="addCar" class="space-y-4">
                        <div>
                            <label class="block mb-1 font-semibold text-gray-700">ทะเบียน</label>
                            <input v-model="newCar.plate" type="text"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required />
                        </div>
                        <div>
                            <label class="block mb-1 font-semibold text-gray-700">วันเริ่มต้น</label>
                            <input v-model="newCar.start" type="datetime-local"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required />
                        </div>
                        <div>
                            <label class="block mb-1 font-semibold text-gray-700">วันสิ้นสุด</label>
                            <input v-model="newCar.end" type="datetime-local"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required />
                        </div>
                        <div class="flex justify-end gap-2 mt-6">
                            <button type="button" @click="showPopup = false"
                                class="px-4 py-2 rounded-lg bg-gray-300 font-bold">ยกเลิก</button>
                            <button type="submit"
                                class="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
            <table class="w-full text-left text-sm border-collapse mt-6 shadow-sm rounded-xl overflow-hidden">
                <thead>
                    <tr class="bg-gradient-to-r from-green-200 to-blue-200 text-green-900">
                        <th class="py-3 px-2">ทะเบียน</th>
                        <th class="py-3 px-2">วันเริ่มต้น</th>
                        <th class="py-3 px-2">วันสิ้นสุด</th>
                        <th class="py-3 px-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(car, idx) in cars" :key="idx" class="border-b hover:bg-blue-50">
                        <td class="py-2 px-2 break-all max-w-plate">{{ car.plate }}</td>
                        <td class="py-2 px-2">{{ car.start }}</td>
                        <td class="py-2 px-2">{{ car.end }}</td>
                        <td class="py-2 px-2">
                            <button
                                class="bg-red-100 text-red-600 rounded-full px-3 py-1 font-bold shadow hover:bg-red-200 transition">-</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Bar from '../components/Bar.vue';
export default {
    components: { Bar },
    data() {
        return {
            residentName: '',
            cars: [],
            showPopup: false,
            newCar: {
                plate: '',
                start: '',
                end: ''
            }
        }
    },
    created() {
        const storedName = localStorage.getItem('residentName');

        if (storedName) {
            this.residentName = storedName;
        } else {
            this.residentName = 'ไม่พบชื่อเจ้าของบ้าน';
        }
    },
    methods: {
        addCar() {
            const formatDate = (dt) => {
                if (!dt) return '';
                const d = new Date(dt);
                return d.toLocaleString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
            };
            this.cars.push({
                plate: this.newCar.plate,
                start: formatDate(this.newCar.start),
                end: formatDate(this.newCar.end)
            });
            this.newCar.plate = '';
            this.newCar.start = '';
            this.newCar.end = '';
            this.showPopup = false;
        }
    }
}
</script>

<style>
.max-w-xl {
    max-width: 520px;
}

.shadow-xl {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.rounded-2xl {
    border-radius: 1rem;
}

.animate-fadein {
    animation: fadein 0.3s;
}

@keyframes fadein {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

table th,
table td {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.break-all {
    word-break: break-all;
}

.max-w-plate {
    max-width: 120px;
    white-space: pre-line;
}
</style>