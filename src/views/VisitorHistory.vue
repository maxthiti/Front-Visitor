<template>
    <div>
        <Bar>
            <template #name>
                คุณ {{ residentName }}
            </template>
        </Bar>
        <div class="max-w-xl mx-auto mt-2 p-6 bg-white rounded-2xl shadow-xl">
            <div class="flex justify-between items-center mb-6">
                <span class="font-bold text-lg">ประวัติผู้มาเยือน</span>
                <button class="bg-gray-200 rounded px-4 py-1 font-bold text-gray-700 hover:bg-gray-300 transition"
                    @click="showPopup = true">+
                    เพิ่มผู้มาเยือน</button>
            </div>
            <table class="w-full text-left text-sm border-collapse shadow-sm rounded-xl overflow-hidden">
                <thead>
                    <tr class="bg-gradient-to-r from-green-200 to-blue-200 text-green-900">
                        <th class="py-3 px-2">ทะเบียน</th>
                        <th class="py-3 px-2">วันที่เข้า</th>
                        <th class="py-3 px-2">ออก</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(visitor, idx) in visitors" :key="idx" class="border-b hover:bg-blue-50">
                        <td class="py-2 px-2 break-all max-w-plate">{{ visitor.plate }}</td>
                        <td class="py-2 px-2 ">{{ visitor.in }}</td>
                        <td class="py-2 px-2 ">{{ visitor.out }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-3">
            <div class="bg-white p-8 rounded-2xl shadow-xl w-96 animate-fadein">
                <h3 class="text-xl font-bold mb-6 text-center text-green-700">เพิ่มผู้มาเยือน</h3>
                <form @submit.prevent="addVisitor" class="space-y-5">
                    <div>
                        <label class="block mb-1 font-semibold text-gray-700">ป้ายทะเบียน</label>
                        <input v-model="form.plate" type="text"
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required />
                    </div>
                    <div>
                        <label class="block mb-1 font-semibold text-gray-700">บ้านเลขที่</label>
                        <input v-model="form.houseNo" type="number"
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required />
                    </div>
                    <div>
                        <label class="block mb-1 font-semibold text-gray-700">วันที่เข้า</label>
                        <input v-model="form.in" type="datetime-local"
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required />
                    </div>
                    <div>
                        <label class="block mb-1 font-semibold text-gray-700">ถึงวันที่</label>
                        <input v-model="form.out" type="datetime-local"
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required />
                    </div>
                    <div class="flex justify-center gap-4 mt-6">
                        <button type="button" @click="cancel"
                            class="px-6 py-2 rounded-lg bg-gray-300 font-bold hover:bg-gray-400 transition">ยกเลิก</button>
                        <button type="submit"
                            class="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition">บันทึก</button>
                    </div>
                </form>
            </div>
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
            visitors: [],
            showPopup: false,
            form: {
                plate: '',
                houseNo: '',
                in: '',
                out: ''
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
        addVisitor() {
            const formatDate = (dt) => {
                if (!dt) return '';
                const d = new Date(dt);
                return d.toLocaleString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
            };
            this.visitors.push({
                plate: this.form.plate,
                in: formatDate(this.form.in),
                out: formatDate(this.form.out)
            });
            this.form.plate = '';
            this.form.houseNo = '';
            this.form.in = '';
            this.form.out = '';
            this.showPopup = false;
        },
        cancel() {
            this.form.plate = '';
            this.form.houseNo = '';
            this.form.in = '';
            this.form.out = '';
            this.showPopup = false;
        }
    }
}
</script>

<style scoped>
.max-w-xl {
    max-width: 520px;
}

.shadow-xl {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.rounded-2xl {
    border-radius: 1rem;
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
</style>
