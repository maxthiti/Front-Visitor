<template>
    <div class="px-2">
        <div class="w-full max-w-[1800px] mx-auto mt-2 p-6 bg-white rounded-2xl shadow-xl">
            <div class="flex justify-between items-center mb-6">
                <span class="font-bold text-lg">ประวัติการเข้าออก</span>
            </div>

            <div class="mb-4 flex flex-wrap justify-between items-center gap-4">
                <div class="flex gap-4">
                    <input type="text" v-model="filter.license" @keyup.enter="fetchHistory" placeholder="ค้นหาทะเบียนรถ"
                        class="border p-2 rounded w-40">

                    <button @click="fetchHistory" :disabled="loading"
                        class="bg-blue-500 text-white p-2 rounded transition disabled:opacity-50">
                        ค้นหา
                    </button>
                </div>
                <div class="flex flex-col">
                    <label class="text-xs text-gray-500 mb-1 whitespace-nowrap">ช่วงวันที่</label>
                    <flat-pickr v-model="dateRange" :config="flatpickrConfig" @on-change="onDateRangeChange"
                        placeholder="เลือกวันที่"
                        class="border-gray-400 border-1 p-2 rounded max-w-[250px] bg-white text-gray-700" />
                </div>

            </div>

            <table class="w-full text-left text-sm border-collapse shadow-sm rounded-xl overflow-hidden">
                <thead>
                    <tr class="bg-gradient-to-r from-green-200 to-blue-200 text-green-900">
                        <th class="py-3 px-2">ทะเบียน</th>
                        <th class="py-3 px-2">รูป1</th>
                        <th class="py-3 px-2">รูป2</th>
                        <th class="py-3 px-2">วันเวลา</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="4" class="py-4 text-center text-gray-500 animate-pulse">
                            กำลังโหลดข้อมูล...
                        </td>
                    </tr>

                    <tr v-else v-for="(record, idx) in paginatedRecords" :key="idx"
                        class="border-b hover:bg-orange-50 transition duration-100">
                        <td class="py-2 px-2 break-all max-w-plate">{{ record.plate }}</td>

                        <td class="py-2 px-2">
                            <img :src="record.photo1" v-if="record.photo1" @click="showFullScreenImage(record.photo1)"
                                class="cursor-pointer shadow object-cover w-[120px] h-auto border-2 hover:border-blue-500 transition duration-150"
                                alt="รูปภาพ 1">
                            <span v-else>-</span>
                        </td>

                        <td class="py-2 px-2">
                            <img :src="record.photo2" v-if="record.photo2" @click="showFullScreenImage(record.photo2)"
                                class="cursor-pointer shadow object-cover w-[120px] h-auto border-2 hover:border-blue-500 transition duration-150"
                                alt="รูปภาพ 2">
                            <span v-else>-</span>
                        </td>

                        <td class="py-2 px-2 ">{{ record.time }}</td>
                    </tr>
                    <tr v-if="!loading && licenseRecords.length === 0">
                        <td colspan="4" class="py-4 text-center text-gray-500">
                            ไม่พบประวัติการเข้าออก
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

        <transition name="modal-fade">
            <div v-if="isModalOpen" @click.self="closeFullScreenImage"
                class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
                <div class="relative max-w-full max-h-full">
                    <button @click="closeFullScreenImage"
                        class="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition focus:outline-none">
                        &times;
                    </button>
                    <img :src="modalImageUrl" alt="Fullscreen Image" class="max-w-full max-h-screen object-contain"
                        style="max-height: 95vh; max-width: 95vw;">
                </div>
            </div>
        </transition>
    </div>
</template>
<script>

import { LicensePlateService } from '../../api/License-plate';
import Swal from 'sweetalert2';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    components: {
        flatPickr
    },
    data() {
        return {
            licensePlateService: new LicensePlateService(),
            loading: false,
            pagination: {
                limit: 8,
                page: 1,
                total: 0,
            },
            filter: {
                license: '',
                start: '2024-01-01 00:00:00',
                end: '2025-12-31 23:59:59',
            },
            licenseRecords: [],
            screenHeight: window.innerHeight,
            dateRange: '',
            flatpickrConfig: {
                mode: "range",
                dateFormat: "Y-m-d",
                altFormat: "d/m/Y",
                altInput: true,
                locale: {
                    rangeSeparator: ' ถึง '
                },
            },
            isModalOpen: false,
            modalImageUrl: '',
        }
    },
    watch: {
        screenHeight(newHeight) {
            this.updatePaginationLimit(newHeight);
        }
    },
    computed: {
        paginatedRecords() {
            const start = (this.pagination.page - 1) * this.pagination.limit;
            return this.licenseRecords.slice(start, start + this.pagination.limit);
        },
        totalPages() {
            if (this.pagination.limit <= 0) return 1;
            return Math.max(1, Math.ceil(this.pagination.total / this.pagination.limit));
        },
        shouldShowPagination() {
            return this.pagination.total > this.pagination.limit;
        }
    },
    mounted() {
        if (!this.dateRange) {
            this.dateRange = `${this.getTodayStart().split(' ')[0]} to ${this.getTodayEnd().split(' ')[0]}`;
        }

        this.updatePaginationLimit(this.screenHeight);
        this.fetchHistory();
        window.addEventListener('resize', this.updateScreenHeight);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateScreenHeight);
    },

    methods: {
        getTodayStart() {
            const today = new Date();
            const date = today.toISOString().split('T')[0];
            return `${date} 00:00:00`;
        },
        getTodayEnd() {
            const today = new Date();
            const date = today.toISOString().split('T')[0];
            return `${date} 23:59:59`;
        },

        showFullScreenImage(imageUrl) {
            if (imageUrl) {
                this.modalImageUrl = imageUrl;
                this.isModalOpen = true;
            }
        },
        closeFullScreenImage() {
            this.isModalOpen = false;
            this.modalImageUrl = '';
        },

        async fetchHistory() {
            this.loading = true;

            const separator = this.dateRange.includes(' ถึง ') ? ' ถึง ' : ' to ';

            if (this.dateRange) {
                const dates = this.dateRange.split(separator);
                if (dates.length === 2) {
                    this.filter.start = `${dates[0]} 00:00:00`;
                    this.filter.end = `${dates[1]} 23:59:59`;
                }
            } else {
                this.filter.start = this.getTodayStart();
                this.filter.end = this.getTodayEnd();
            }

            try {
                const response = await this.licensePlateService.getVehicleHistory(
                    this.filter.start,
                    this.filter.end,
                    this.pagination.limit,
                    this.pagination.page,
                    this.filter.license
                );
                console.log("response", response);

                const historyData = response.data || [];

                const apiPagination = response.pagination || {};
                this.pagination.total = typeof apiPagination.total === 'number'
                    ? apiPagination.total
                    : historyData.length;

                const mappedRecords = historyData.map(r => ({
                    plate: r.plates && r.plates.length > 0 ? r.plates[0].License : 'ไม่พบทะเบียน',
                    photo1: r.platesPhoto,
                    photo2: r.platesPhoto2,
                    time: this.formatDate(r.detectDate),
                }));

                this.licenseRecords = mappedRecords;
            } catch (error) {
                console.error("Failed to fetch history:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'ดึงข้อมูลไม่สำเร็จ',
                    text: 'ไม่สามารถโหลดรายการผู้มาเยือนได้ กรุณาลองใหม่อีกครั้ง'
                });
                this.licenseRecords = [];
            } finally {
                this.loading = false;
            }
        },

        onDateRangeChange() {
            this.changePage(1);
        },

        changePage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages) {
                this.pagination.page = newPage;
                this.fetchHistory();
            }
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
    },
}
</script>
<style>
.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .3s ease;
}
</style>