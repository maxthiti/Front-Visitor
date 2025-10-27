<template>
    <div class="px-2">
        <div class="w-full max-w-[1800px] mx-auto mt-2 p-6 bg-white rounded-2xl shadow-xl">

            <div class="flex justify-between items-center mb-6">
                <span class="font-bold text-lg">ทะเบียนรถผู้มาเยือน</span>
                <button
                    class="bg-gradient-to-r from-orange-200 to-amber-200 rounded px-4 py-1 font-bold text-orange-700 hover:bg-orange-200 transition"
                    @click="showPopup = true">
                    + เพิ่มผู้มาเยือน
                </button>
            </div>

            <div class="flex flex-row flex-nowrap items-center gap-4 mb-4">
                <input type="text" placeholder="ค้นหาทะเบียน/ชื่อผู้มาเยือน..." v-model="searchQuery"
                    @input="onSearchInput"
                    class="p-2 border border-gray-300 rounded-lg min-w-0 focus:ring-orange-500 focus:border-orange-500 transition"
                    :class="{ 'border-orange-500 ring-1 ring-orange-500': searchQuery }">
                <DatePicker v-model:value="selectedDate" lang="en" format="DD/MM/YYYY" value-type="YYYY-MM-DD"
                    @change="onDateChange" placeholder="เลือกวันที่"
                    class="p-2 border border-gray-300 rounded-lg w-1/2 min-w-0 focus:ring-orange-500 focus:border-orange-500 transition"
                    :class="{ 'border-orange-500 ring-1 ring-orange-500': selectedDate }"> </DatePicker>

            </div>
            <table class="w-full text-left text-sm border-collapse shadow-sm rounded-xl overflow-hidden">
                <thead>
                    <tr class="bg-gradient-to-r from-green-200 to-blue-200 text-green-900">
                        <th class="py-3 px-2">ทะเบียน / จังหวัด</th>
                        <th class="py-3 px-2 max-[500px]:hidden">ชื่อผู้มาเยือน</th>
                        <th class="py-3 px-2">วันที่เข้า</th>
                        <th class="py-3 px-2">ออก</th>
                        <th class="py-3 px-2">สถานะ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="5" class="py-4 text-center text-gray-500 animate-pulse">
                            กำลังโหลดข้อมูล...
                        </td>
                    </tr>
                    <tr v-else v-for="(visitor, idx) in paginatedVisitors" :key="visitor.id || idx"
                        class="border-b hover:bg-orange-50 transition duration-100">
                        <td class="py-2 px-2 break-all max-w-plate">
                            <div class="font-semibold text-gray-800">{{ visitor.plate }}</div>
                            <div class="text-xs text-gray-500">{{ visitor.province }}</div>
                        </td>
                        <td class="py-2 px-2 max-[500px]:hidden">{{ visitor.guestName }}</td>
                        <td class="py-2 px-2 ">{{ visitor.in }}</td>
                        <td class="py-2 px-2 ">{{ visitor.out }}</td>
                        <td class="py-2 px-2">
                            <div class="flex items-center gap-2">
                                <button v-if="visitor.status" @click="handleDisableVisitor(visitor.id, visitor.plate)"
                                    class="inline-flex items-center justify-center w-8 h-8 rounded border border-green-200 bg-green-50 text-green-600 text-sm hover:bg-green-100 transition"
                                    title="ปิดการใช้งาน (ถาวร)">
                                    ✔
                                </button>

                                <span v-else
                                    class="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 text-red-500 text-sm"
                                    title="ปิดการใช้งานแล้ว">❌</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!loading && filteredVisitors.length === 0">
                        <td colspan="5" class="py-4 text-center text-gray-500">
                            {{ hasActiveFilters ? 'ไม่พบข้อมูลที่ตรงกับตัวกรอง' : 'ไม่มีข้อมูลผู้มาเยือนในขณะนี้' }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="shouldShowPagination && !loading" class="flex justify-center items-center space-x-2 mt-4 pb-2">

                <button :disabled="pagination.page === 1" @click="changePage(pagination.page - 1)"
                    :class="{ 'opacity-50 cursor-not-allowed': pagination.page === 1, 'hover:bg-orange-100': pagination.page > 1 }"
                    class="p-2 rounded-full bg-white border border-gray-300 text-sm font-semibold text-gray-700 transition">
                    &lt; ก่อนหน้า
                </button>

                <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                    :class="{ 'bg-orange-600 text-white shadow-md': page === pagination.page, 'bg-white text-gray-700 hover:bg-orange-100': page !== pagination.page }"
                    class="px-3 py-1 rounded-full text-sm font-semibold transition">
                    {{ page }}
                </button>

                <button :disabled="pagination.page === totalPages" @click="changePage(pagination.page + 1)"
                    :class="{ 'opacity-50 cursor-not-allowed': pagination.page === totalPages, 'hover:bg-orange-100': pagination.page < totalPages }"
                    class="p-2 rounded-full bg-white border border-gray-300 text-sm font-semibold text-gray-700 transition">
                    ถัดไป &gt;
                </button>
            </div>
        </div>

        <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-3">

            <div
                class="bg-white p-4 sm:p-8 rounded-2xl shadow-xl w-full max-w-md animate-fadein max-h-full overflow-y-auto">
                <h3 class="text-xl font-bold mb-6 text-green-700 text-center">เพิ่มทะเบียนรถผู้มาเยือน</h3>
                <CreateVisitor @success="onVisitorCreated" @cancel="showPopup = false" />
            </div>

        </div>
    </div>
</template>

<script>
import CreateVisitor from '../../components/visitor/Create.vue';
import { VisitorService } from '../../api/Visitor';
import Swal from 'sweetalert2';
import DatePicker from 'vue-datepicker-next';

export default {
    components: {
        CreateVisitor,
        DatePicker,
    },
    data() {
        return {
            visitorService: new VisitorService(),
            loading: false,
            searchQuery: '',
            selectedDate: '',
            pagination: {
                limit: 8,
                page: 1,
                total: 0,
            },
            screenHeight: window.innerHeight,
            visitors: [],
            showPopup: false,
        }
    },
    computed: {
        isShortScreen() {
            return this.screenHeight <= 740;
        },
        hasActiveFilters() {
            return !!this.searchQuery.trim() || !!this.selectedDate;
        },
        filteredVisitors() {
            const q = this.searchQuery.trim().toLowerCase();
            const sel = this.selectedDate ? new Date(this.selectedDate) : null;

            const isSameDay = (dateA, dateB) => {
                if (!dateA || !dateB) return false;
                const dA = new Date(dateA);
                const dB = new Date(dateB);
                if (isNaN(dA.getTime()) || isNaN(dB.getTime())) return false;
                return dA.getFullYear() === dB.getFullYear() && dA.getMonth() === dB.getMonth() && dA.getDate() === dB.getDate();
            };

            let list = this.visitors.slice();

            if (q) {
                list = list.filter(v => {
                    return (v.plate && v.plate.toLowerCase().includes(q)) ||
                        (v.guestName && v.guestName.toLowerCase().includes(q));
                });
            }

            if (sel) {
                list = list.filter(v => {
                    return isSameDay(v.startRaw, sel) || isSameDay(v.expireRaw, sel);
                });
            }

            list.sort((a, b) => {
                const da = new Date(a.startRaw || a.inRaw || 0).getTime();
                const db = new Date(b.startRaw || b.inRaw || 0).getTime();
                return db - da;
            });

            this.pagination.total = list.length;

            return list;
        },
        paginatedVisitors() {
            const limit = this.isShortScreen ? 5 : 8;
            this.pagination.limit = limit;

            if (!this.hasActiveFilters) {
                return this.filteredVisitors.slice(0, limit);
            }

            const start = (this.pagination.page - 1) * limit;
            return this.filteredVisitors.slice(start, start + limit);
        },
        totalPages() {
            const limit = this.isShortScreen ? 5 : 8;
            if (limit <= 0) return 1;
            return Math.max(1, Math.ceil(this.filteredVisitors.length / limit));
        },
        shouldShowPagination() {
            const limit = this.isShortScreen ? 5 : 8;
            return this.hasActiveFilters && this.filteredVisitors.length > limit;
        }
    },
    watch: {
        screenHeight(newHeight) {
            this.updatePaginationLimit(newHeight);
        }
    },
    mounted() {
        this.updatePaginationLimit(this.screenHeight);

        window.addEventListener('resize', this.updateScreenHeight);

        this.fetchVisitors();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenHeight);
    },
    methods: {
        async fetchVisitors() {
            this.loading = true;

            try {
                const ALL_LIMIT = 10000;
                const response = await this.visitorService.getVisitorList(ALL_LIMIT, 1, null);
                const visitorData = (response && response.data) || [];

                if (visitorData && visitorData.length) {
                    this.visitors = visitorData.map(v => ({
                        id: v._id,
                        plate: v.licensePlate,
                        province: v.licensePlateProvince,
                        guestName: v.guestName,
                        in: this.formatDate(v.start),
                        out: this.formatDate(v.expire),
                        startRaw: v.start,
                        expireRaw: v.expire,
                        status: v.status !== false
                    }));

                    this.pagination.total = this.visitors.length;
                } else {
                    this.visitors = [];
                    this.pagination.total = 0;
                }
            } catch (error) {
                console.error("Failed to fetch visitors:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'ดึงข้อมูลไม่สำเร็จ',
                    text: 'ไม่สามารถโหลดรายการผู้มาเยือนได้ กรุณาลองใหม่อีกครั้ง'
                });
            } finally {
                this.loading = false;
            }
        },

        onSearchInput() {
            this.pagination.page = 1;
        },

        onDateChange() {
            this.pagination.page = 1;
        },

        resetFilters() {
            this.searchQuery = '';
            this.selectedDate = '';
            this.pagination.page = 1;
        },

        async handleDisableVisitor(visitorId, licensePlate) {
            Swal.fire({
                title: 'ยืนยันการปิดใช้งาน?',
                text: `คุณต้องการปิดใช้งานทะเบียนรถ ${licensePlate} ใช่หรือไม่?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EA580C',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'ใช่, ปิดใช้งาน',
                cancelButtonText: 'ยกเลิก'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.loading = true;
                    try {
                        await this.visitorService.disableVisitor(visitorId);

                        await Swal.fire({
                            icon: 'success',
                            title: 'ปิดใช้งานสำเร็จ',
                            text: `ทะเบียน ${licensePlate} ถูกปิดใช้งานแล้ว`,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.fetchVisitors();

                    } catch (error) {
                        console.error("Failed to disable visitor:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'ปิดใช้งานไม่สำเร็จ',
                            text: error.response?.data?.message || 'เกิดข้อผิดพลาดในการปิดใช้งาน กรุณาตรวจสอบการเชื่อมต่อ'
                        });
                    } finally {
                        this.loading = false;
                    }
                }
            });
        },

        onVisitorCreated(newVisitorData) {
            this.showPopup = false;
            this.pagination.page = 1;
            this.fetchVisitors();
        },

        formatDate(dt) {
            if (!dt) return '-';
            const d = new Date(dt);
            if (isNaN(d.getTime())) return dt;
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        },

        changePage(newPage) {
            if (!this.hasActiveFilters) return;
            this.pagination.page = newPage;
        },

        updateScreenHeight() {
            this.screenHeight = window.innerHeight;
        },

        updatePaginationLimit(height) {
            const newLimit = height <= 740 ? 5 : 8;
            if (newLimit !== this.pagination.limit) {
                this.pagination.limit = newLimit;
                this.pagination.page = 1;
            }
        },
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
    max-width: 150px;
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

.animate-fadein {
    animation: fadein 0.3s ease-out;
}
</style>