<template>
    <div class="">
        <Bar>
            <template #name>
                คุณ {{ residentName }}
            </template>
        </Bar>
        <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
            <h2 class="text-xl font-bold mb-6 text-center text-green-700">เพิ่มผู้มาเยือน</h2>
            <form @submit.prevent="addVisitor" class="space-y-5">
                <div>
                    <label class="block mb-1 font-semibold text-gray-700">ป้ายทะเบียน</label>
                    <input v-model="form.plate" type="text"
                        class="w-full bg-gray-200 rounded-lg px-4 py-3 focus:outline-none" required />
                </div>
                <div>
                    <label class="block mb-1 font-semibold text-gray-700">บ้านเลขที่</label>
                    <input v-model="form.houseNo" type="text"
                        class="w-full bg-gray-200 rounded-lg px-4 py-3 focus:outline-none" required />
                </div>
                <div>
                    <label class="block mb-1 font-semibold text-gray-700">วันที่เข้า</label>
                    <input v-model="form.in" type="datetime-local"
                        class="w-full bg-gray-200 rounded-lg px-4 py-3 focus:outline-none" required />
                </div>
                <div>
                    <label class="block mb-1 font-semibold text-gray-700">ถึงวันที่</label>
                    <input v-model="form.out" type="datetime-local"
                        class="w-full bg-gray-200 rounded-lg px-4 py-3 focus:outline-none" required />
                </div>
                <div class="flex justify-center gap-4 mt-6">
                    <button type="button" @click="cancel"
                        class="px-6 py-2 rounded bg-gray-300 font-bold hover:bg-gray-400 transition">ยกเลิก</button>
                    <button type="submit"
                        class="px-6 py-2 rounded bg-gray-300 font-bold hover:bg-green-400 transition">บันทึก</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Bar from '../components/Bar.vue';
export default {
    components: { Bar },
    data() {
        return {
            form: {
                plate: '',
                houseNo: '',
                in: '',
                out: ''
            }
        }
    },
    methods: {
        addVisitor() {
            // เพิ่มฟังก์ชันบันทึกข้อมูลตามต้องการ
            alert('บันทึกข้อมูลผู้มาเยือนเรียบร้อย');
            this.form.plate = '';
            this.form.houseNo = '';
            this.form.in = '';
            this.form.out = '';
        },
        cancel() {
            // เพิ่มฟังก์ชันยกเลิกตามต้องการ
            this.form.plate = '';
            this.form.houseNo = '';
            this.form.in = '';
            this.form.out = '';
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
}
</script>

<style scoped>
.max-w-md {
    max-width: 400px;
}

.shadow-xl {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.rounded-2xl {
    border-radius: 1rem;
}

input[type="text"],
input[type="datetime-local"] {
    font-size: 1rem;
}
</style>
