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
                    <flat-pickr v-model="dateRange" :config="flatpickrConfig" @on-change="changePage(1)"
                        placeholder="เลือกวันที่"
                        class="border-gray-400 border-1 p-2 rounded max-w-[250px] bg-white text-gray-700" />
                </div>

            </div>

            <table class="w-full text-left text-sm border-collapse shadow-sm rounded-xl overflow-hidden">
                <thead>
                    <tr class="bg-gradient-to-r from-green-200 to-blue-200 text-green-900">
                        <th class="py-3 px-2">ทะเบียน</th>
                        <th class="py-3 px-2">ประเภท</th>
                        <th class="py-3 px-2">วันที่เข้า</th>
                        <th class="py-3 px-2">วันที่ออก</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="4" class="py-4 text-center text-gray-500 animate-pulse">
                            กำลังโหลดข้อมูล...
                        </td>
                    </tr>

                    <tr v-else v-for="(record, idx) in licenseRecords" :key="idx"
                        class="border-b hover:bg-orange-50 transition duration-100">
                        <td class="py-2 px-2 break-all max-w-plate">{{ record.plate }}</td>
                        <td class="py-2 px-2 ">{{ record.type }}</td>
                        <td class="py-2 px-2 ">{{ record.in }}</td>
                        <td class="py-2 px-2 ">{{ record.out }}</td>
                    </tr>
                    <tr v-if="!loading && licenseRecords.length === 0">
                        <td colspan="4" class="py-4 text-center text-gray-500">
                            ไม่พบประวัติการเข้าออก
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
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
        }
    },
    watch: {
        screenHeight(newHeight) {
            this.updatePaginationLimit(newHeight);
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

                const historyData = response.data || [];

                this.licenseRecords = historyData.map(r => ({
                    plate: r.licensePlate || r.license,
                    type: r.vehicleType || 'ไม่ระบุ',
                    in: this.formatDateTime(r.startTime),
                    out: this.formatDateTime(r.endTime)
                }));

                this.pagination.total = response.totalItems || this.licenseRecords.length;

            } catch (error) {
                console.error("Failed to fetch history:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'ดึงข้อมูลไม่สำเร็จ',
                    text: 'ไม่สามารถโหลดประวัติการเข้าออกได้ กรุณาลองใหม่อีกครั้ง'
                });
                this.licenseRecords = [];
            } finally {
                this.loading = false;
            }
        },

        formatDateTime(dt) {
            if (!dt) return '-';
            const d = new Date(dt);
            if (isNaN(d)) return dt;

            const pad = (num) => String(num).padStart(2, '0');
            const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;

            return `${date} ${time}`;
        },

        changePage(newPage) {
            this.pagination.page = newPage;
            this.fetchHistory();
        },
        updatePaginationLimit(height) {
            const newLimit = height <= 740 ? 5 : 10;

            if (newLimit !== this.pagination.limit) {
                this.pagination.limit = newLimit;
                this.pagination.page = 1;
                if (!this.loading && this.licenseRecords.length > 0) {
                    this.fetchHistory();
                }
            }
        },
        updateScreenHeight() {
            this.screenHeight = window.innerHeight;
        },

        async fetchHistory() {
            this.loading = true;
            try {
                const response = await this.licensePlateService.getVehicleHistory(
                    this.filter.start,
                    this.filter.end,
                    this.pagination.limit,
                    this.pagination.page,
                    this.filter.license
                );
                const historyData = response.data || [];

                this.licenseRecords = historyData.map(r => ({
                    plate: r.licensePlate || r.license,
                    type: r.vehicleType || 'ไม่ระบุ',
                    in: this.formatDateTime(r.startTime),
                    out: this.formatDateTime(r.endTime)
                }));

                this.pagination.total = response.totalItems || this.licenseRecords.length;

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'ดึงข้อมูลไม่สำเร็จ',
                    text: 'ไม่สามารถโหลดประวัติการเข้าออกได้ กรุณาลองใหม่อีกครั้ง'
                });

                this.licenseRecords = [];
            } finally {
                this.loading = false;
            }
        },
    },
}
</script>