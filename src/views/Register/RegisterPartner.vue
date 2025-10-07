<template>
    <div
        class="partner-register min-h-screen bg-gradient-to-br from-[#e6f7e6] via-white to-[#b6e388] flex items-center justify-center py-8">
        <button @click="goBack" class="absolute top-4 left-4 z-20 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            ย้อนกลับ
        </button>
        <div class="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-4xl w-full">
            <!-- Header Section -->
            <div class="text-center mb-8 lg:mb-12">
                <div class="flex justify-center">
                    <div class="w-20 h-20 rounded-full overflow-hidden pulse-animation">
                        <RecycleIcon class="w-full h-full p-1 object-cover" />
                    </div>
                </div>
                <h1
                    class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#184c36] via-[#b6e388] to-[#184c36] bg-clip-text text-transparent mb-2">
                    สมัครสมาชิก Partner
                </h1>
                <p class="text-[#184c36] text-sm sm:text-base max-w-2xl mx-auto">
                    กรอกข้อมูลให้ครบถ้วนเพื่อสมัครเป็นพาร์ทเนอร์กับเรา
                </p>
            </div>

            <form @submit.prevent="submitForm" class="space-y-8">
                <!-- Personal Information Card -->
                <div class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] overflow-hidden">
                    <div class="p-4 sm:p-6 lg:p-8">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-[#e6f7e6]">
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-[#b6e388] to-[#184c36] rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2
                                    class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent">
                                    ข้อมูลส่วนตัว</h2>
                                <p class="text-sm text-[#184c36] mt-1">กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วน</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            <!-- Username -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    ชื่อผู้ใช้ <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.username" type="text" required minlength="6"
                                    placeholder="อย่างน้อย 6 ตัวอักษร"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                                <p v-if="usernameError" class="text-red-600 text-xs mt-1">{{ usernameError }}</p>
                            </div>

                            <!-- Password -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    รหัสผ่าน <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.password" type="password" required minlength="8"
                                    placeholder="อย่างน้อย 8 ตัวอักษร" autocomplete="new-password"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                            </div>

                            <!-- Title -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    คำนำหน้า <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.title" required
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white">
                                    <option value="" disabled>เลือกคำนำหน้า</option>
                                    <option value="นาย">นาย</option>
                                    <option value="นาง">นาง</option>
                                    <option value="นางสาว">นางสาว</option>
                                    <option value="อื่นๆ">อื่นๆ</option>
                                </select>
                            </div>

                            <!-- Full Name -->
                            <div class="space-y-2 sm:col-span-2 xl:col-span-1">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    ชื่อ-สกุล <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.fullName" type="text" required placeholder="กรอกชื่อ-สกุล"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                            </div>

                            <!-- Personal ID -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    เลขบัตรประจำตัวประชาชน <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.personalId" type="text" required pattern="[0-9]{13}" maxlength="13"
                                    placeholder="1234567890123"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                                <p v-if="personalIdError" class="text-red-600 text-xs mt-1">{{ personalIdError }}</p>
                            </div>

                            <!-- Personal Phone -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    เบอร์โทรศัพท์ <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.personalPhone" type="tel" required pattern="[0-9]{10}"
                                    maxlength="10" placeholder="0812345678"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                                <p v-if="phoneError" class="text-red-600 text-xs mt-1">{{ phoneError }}</p>
                            </div>

                            <!-- Personal Email -->
                            <div class="space-y-2 sm:col-span-2 xl:col-span-1">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    อีเมล <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.personalEmail" type="email" required
                                    placeholder="example@email.com"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                                <p v-if="emailError" class="text-red-600 text-xs mt-1">{{ emailError }}</p>
                            </div>

                            <!-- Personal Address -->
                            <div class="space-y-2 sm:col-span-2 xl:col-span-3">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    ที่อยู่ <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.personalAddress" required placeholder="กรอกที่อยู่บ้านเลขที / หมู่"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none resize-none">
                            </div>

                            <!-- Personal Province -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    จังหวัด <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.personalProvinceId" required @change="loadPersonalDistricts"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white">
                                    <option value="" disabled>เลือกจังหวัด</option>
                                    <option v-for="province in provinces" :key="province.id" :value="province.id">
                                        {{ province.name_th }}
                                    </option>
                                </select>
                            </div>

                            <!-- Personal District -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    อำเภอ <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.personalDistrictId" required :disabled="!form.personalProvinceId"
                                    @change="loadPersonalSubdistricts"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                                    <option value="" disabled>เลือกอำเภอ</option>
                                    <option v-for="district in personalDistricts" :key="district.id"
                                        :value="district.id">
                                        {{ district.name_th }}
                                    </option>
                                </select>
                            </div>

                            <!-- Personal Subdistrict -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    ตำบล <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.personalSubdistrictId" required
                                    :disabled="!form.personalDistrictId" @change="loadPersonalPostalCode"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                                    <option value="" disabled>เลือกตำบล</option>
                                    <option v-for="subdistrict in personalSubdistricts" :key="subdistrict.id"
                                        :value="subdistrict.id">
                                        {{ subdistrict.name_th }}
                                    </option>
                                </select>
                            </div>

                            <!-- Personal Postal Code -->
                            <div class="space-y-2 sm:col-span-2 xl:col-span-1">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    รหัสไปรษณีย์
                                </label>
                                <input v-model="form.personalPostalCode" type="text" readonly
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg bg-gray-100 text-gray-500">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Company Information Card -->
                <div class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] overflow-hidden">
                    <div class="p-4 sm:p-6 lg:p-8">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-[#e6f7e6]">
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-[#b6e388] to-[#184c36] rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h2
                                    class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent">
                                    ข้อมูลบริษัท</h2>
                                <p class="text-sm text-[#184c36] mt-1">กรุณากรอกข้อมูลบริษัทให้ครบถ้วน</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            <!-- Company Name -->
                            <div class="space-y-2 sm:col-span-2 xl:col-span-3">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    ชื่อบริษัท <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.companyName" type="text" required
                                    placeholder="บริษัท ตัวอย่าง จำกัด"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                            </div>

                            <!-- Company Tax ID -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    เลขประจำตัวผู้เสียภาษี <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.companyTaxId" type="text" required pattern="[0-9]{13}"
                                    maxlength="13" placeholder="1234567890123"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                                <p v-if="taxIdError" class="text-red-600 text-xs mt-1">{{ taxIdError }}</p>
                            </div>

                            <!-- Company Phone -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    เบอร์โทรศัพท์บริษัท <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.companyPhone" type="tel" required pattern="[0-9]{10}"
                                    maxlength="10" placeholder="0212345678"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                            </div>

                            <!-- Company Email -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    อีเมลบริษัท <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.companyEmail" type="email" required
                                    placeholder="company@example.com"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none">
                                <p v-if="companyEmailError" class="text-red-600 text-xs mt-1">{{ companyEmailError }}
                                </p>
                            </div>

                            <!-- Company Address -->
                            <div class="space-y-2 sm:col-span-2 xl:col-span-3">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    ที่อยู่บริษัท <span class="text-red-600">*</span>
                                </label>
                                <textarea v-model="form.companyAddress" required rows="3"
                                    placeholder="กรอกที่อยู่บริษัทที่ชัดเจน"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none resize-none"></textarea>
                            </div>

                            <!-- Company Province -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    จังหวัด <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.companyProvinceId" required @change="loadCompanyDistricts"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white">
                                    <option value="" disabled>เลือกจังหวัด</option>
                                    <option v-for="province in provinces" :key="province.id" :value="province.id">
                                        {{ province.name_th }}
                                    </option>
                                </select>
                            </div>

                            <!-- Company District -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    อำเภอ <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.companyDistrictId" required :disabled="!form.companyProvinceId"
                                    @change="loadCompanySubdistricts"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                                    <option value="" disabled>เลือกอำเภอ</option>
                                    <option v-for="district in companyDistricts" :key="district.id"
                                        :value="district.id">
                                        {{ district.name_th }}
                                    </option>
                                </select>
                            </div>

                            <!-- Company Subdistrict -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    ตำบล <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.companySubdistrictId" required :disabled="!form.companyDistrictId"
                                    @change="loadCompanyPostalCode"
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                                    <option value="" disabled>เลือกตำบล</option>
                                    <option v-for="subdistrict in companySubdistricts" :key="subdistrict.id"
                                        :value="subdistrict.id">
                                        {{ subdistrict.name_th }}
                                    </option>
                                </select>
                            </div>

                            <!-- Company Postal Code -->
                            <div class="space-y-2 sm:col-span-2 xl:col-span-1">
                                <label class="block text-sm font-semibold text-[#184c36]">
                                    รหัสไปรษณีย์
                                </label>
                                <input v-model="form.companyPostalCode" type="text" readonly
                                    class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg bg-gray-100 text-gray-500">
                            </div>

                            <!-- File Upload Section -->
                            <div class="sm:col-span-2 xl:col-span-3">
                                <div class="relative my-8">
                                    <div class="absolute inset-0 flex items-center">
                                        <div class="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div class="relative flex justify-center text-sm">
                                        <span class="px-4 bg-white text-gray-500 font-medium">เอกสารและรูปภาพ</span>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    <!-- ID Card Image -->
                                    <div class="space-y-2">
                                        <label class="block text-sm font-semibold text-gray-700">
                                            รูปบัตรประชาชน <span class="text-red-600">*</span>
                                        </label>
                                        <div class="relative">
                                            <label for="idCardInput" class="upload-button">
                                                <span class="upload-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </span>
                                                <span class="upload-text">เลือกรูปบัตรประชาชน</span>
                                                <span class="upload-hint">JPG, PNG (สูงสุด 10MB)</span>
                                                <input id="idCardInput" name="idCard" type="file" accept="image/*"
                                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    @change="handleIdCardSelect" />
                                            </label>
                                            <div v-if="idCardFileName"
                                                class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                                                <div class="flex items-center gap-2 text-sm text-green-700">
                                                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <span class="truncate">{{ idCardFileName }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Company Stamp Image -->
                                    <div class="space-y-2">
                                        <label class="block text-sm font-semibold text-gray-700">
                                            ตราประทับบริษัท <span class="text-red-600">*</span>
                                        </label>
                                        <div class="relative">
                                            <label for="stampInput" class="upload-button">
                                                <span class="upload-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </span>
                                                <span class="upload-text">เลือกตราประทับบริษัท</span>
                                                <span class="upload-hint">JPG, PNG (สูงสุด 10MB)</span>
                                                <input id="stampInput" type="file" accept="image/*"
                                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    @change="handleStampSelect" name="stamp" />
                                            </label>
                                            <div v-if="stampFileName"
                                                class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                                                <div class="flex items-center gap-2 text-sm text-green-700">
                                                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <span class="truncate">{{ stampFileName }}</span>
                                                </div>
                                            </div>
                                            <p v-if="stampError" class="text-red-600 text-xs mt-1">{{ stampError }}</p>
                                        </div>
                                    </div>

                                    <!-- Company Logo -->
                                    <div class="space-y-2">
                                        <label class="block text-sm font-semibold text-gray-700">
                                            โลโก้บริษัท <span class="text-red-600">*</span>
                                        </label>
                                        <div class="relative">
                                            <label for="logoInput" class="upload-button">
                                                <span class="upload-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </span>
                                                <span class="upload-text">เลือกโลโก้บริษัท</span>
                                                <span class="upload-hint">JPG, PNG (สูงสุด 10MB)</span>
                                                <input id="logoInput" type="file" accept="image/*"
                                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    @change="handleLogoSelect" name="logo" />
                                            </label>
                                            <div v-if="logoFileName"
                                                class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                                                <div class="flex items-center gap-2 text-sm text-green-700">
                                                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <span class="truncate">{{ logoFileName }}</span>
                                                </div>
                                            </div>
                                            <p v-if="logoError" class="text-red-600 text-xs mt-1">{{ logoError }}</p>
                                        </div>
                                    </div>

                                    <div class="space-y-2">
                                        <label class="block text-sm font-semibold text-gray-700">
                                            รูปภาพร้านค้า <span class="text-red-600">*</span>
                                        </label>
                                        <div class="relative">
                                            <label for="shopImageInput" class="upload-button">
                                                <span class="upload-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </span>
                                                <span class="upload-text">เลือกรูปภาพร้านค้า</span>
                                                <span class="upload-hint">JPG, PNG (สูงสุด 10MB)</span>
                                                <input id="shopImageInput" type="file" accept="image/*"
                                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    @change="handleShopImageSelect" />
                                            </label>
                                            <div v-if="shopImageFileName"
                                                class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                                                <div class="flex items-center gap-2 text-sm text-green-700">
                                                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <span class="truncate">{{ shopImageFileName }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Documents Card -->
                <div class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] overflow-hidden">
                    <div class="p-4 sm:p-6 lg:p-8">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-[#b6e388] to-[#184c36] rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h2
                                    class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent">
                                    เอกสารที่เกี่ยวข้อง</h2>
                                <p class="text-sm text-gray-500 mt-1">กรุณาอัพโหลดเอกสารอย่างน้อย 1 ฉบับ</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div v-for="index in 4" :key="index" class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700">
                                    เอกสารบริษัท {{ index }}
                                </label>
                                <div class="relative">
                                    <label :for="`docInput-${index - 1}`" class="upload-button">
                                        <span class="upload-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </span>
                                        <span class="upload-text">เลือกไฟล์</span>
                                        <span class="upload-hint">PDF, DOC, JPG (สูงสุด 10MB)</span>
                                        <input type="file" :id="`docInput-${index - 1}`"
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            @change="handleDocSelect($event, index - 1)" />
                                    </label>
                                    <div v-if="documentFileNames[index - 1]"
                                        class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                                        <div class="flex items-center gap-2 text-sm text-green-700">
                                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span class="truncate">{{ documentFileNames[index - 1] }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="documentsError" class="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                    </path>
                                </svg>
                                <span class="text-red-700 font-medium">{{ documentsError }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Signature Card -->
                <!-- <div class="bg-white rounded-2xl shadow-xl border-l-4 border-red-600 overflow-hidden">
                    <div class="p-4 sm:p-6 lg:p-8">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-purple-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h2
                                    class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-red-700 bg-clip-text text-transparent">
                                    ลายเซ็น</h2>
                                <p class="text-sm text-gray-500 mt-1">เพิ่มลายเซ็นผู้มีอำนาจลงนาม/พยาน
                                    ที่ท่านต้องการให้ปรากฏในสัญญา</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700">
                                    ชื่อ-สกุลผู้ลงนามสัญญา <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.signatoryName" type="text" required placeholder="กรอกชื่อ-สกุล"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 outline-none">
                            </div>

                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700">
                                    อำนาจการลงนาม <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.signatoryAuthority" required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 outline-none bg-white">
                                    <option value="" disabled>เลือกอำนาจการลงนาม</option>
                                    <option value="ผู้มีอำนาจลงนาม">ผู้มีอำนาจลงนาม</option>
                                    <option value="ผู้แทน">ผู้แทน</option>
                                    <option value="พยาน">พยาน</option>
                                    <option value="อื่นๆ">อื่นๆ</option>
                                </select>
                            </div>

                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700">
                                    ตำแหน่งในบริษัท <span class="text-red-600">*</span>
                                </label>
                                <input v-model="form.signatoryPosition" type="text" required
                                    placeholder="เช่น กรรมการผู้จัดการ"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 outline-none">
                            </div>

                            <div class="space-y-3 sm:col-span-2 xl:col-span-3">
                                <label class="block text-sm font-semibold text-gray-700">
                                    ประเภทลายเซ็น <span class="text-red-600">*</span>
                                </label>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label class="relative cursor-pointer">
                                        <input type="radio" v-model="form.signatureType" value="handwritten" required
                                            class="sr-only peer" />
                                        <div
                                            class="w-full p-4 border-2 border-gray-200 rounded-xl peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-red-300 transition-all duration-300">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center peer-checked:shadow-lg">
                                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="flex-1">
                                                    <span class="block font-semibold text-gray-800">เซ็นลายมือ</span>
                                                    <span
                                                        class="block text-sm text-gray-500">ใช้เมาส์หรือนิ้วเพื่อเซ็นชื่อ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="relative cursor-pointer">
                                        <input type="radio" v-model="form.signatureType" value="upload" required
                                            class="sr-only peer" />
                                        <div
                                            class="w-full p-4 border-2 border-gray-200 rounded-xl peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-red-300 transition-all duration-300">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center peer-checked:shadow-lg">
                                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="flex-1">
                                                    <span
                                                        class="block font-semibold text-gray-800">อัพโหลดลายเซ็น</span>
                                                    <span
                                                        class="block text-sm text-gray-500">อัพโหลดรูปลายเซ็นที่มีอยู่แล้ว</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div v-if="form.signatureType === 'handwritten'"
                                class="space-y-3 sm:col-span-2 xl:col-span-3">
                                <label class="block text-sm font-semibold text-gray-700">
                                    กรุณาเซ็นชื่อในกรอบด้านล่าง
                                </label>
                                <div
                                    class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
                                    <div
                                        class="bg-white rounded-lg shadow-inner border-2 border-dashed border-gray-300 overflow-hidden">
                                        <VueSignaturePad ref="signaturePad" width="100%" height="200px"
                                            :options="{ penColor: '#000', backgroundColor: '#ffffff' }" />
                                    </div>
                                    <div class="flex justify-between items-center mt-4">
                                        <div class="flex items-center gap-2 text-sm text-gray-500">
                                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                                </path>
                                            </svg>
                                            <span>ใช้เมาส์หรือนิ้วเพื่อเซ็นชื่อ</span>
                                        </div>
                                        <button type="button" @click="clearSignature"
                                            class="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                </path>
                                            </svg>
                                            ล้างลายเซ็น
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="form.signatureType === 'upload'" class="space-y-2 sm:col-span-2 xl:col-span-3">
                                <label class="block text-sm font-semibold text-gray-700">
                                    อัพโหลดลายเซ็น <span class="text-red-600">*</span>
                                </label>
                                <div class="relative">
                                    <label for="signatureInput" class="upload-button">
                                        <span class="upload-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </span>
                                        <span class="upload-text">เลือกลายเซ็น</span>
                                        <span class="upload-hint">JPG, PNG, GIF (สูงสุด 2MB)</span>
                                        <input id="signatureInput" type="file" accept="image/*"
                                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            @change="handleSignatureSelect" required />
                                    </label>

                                    <div v-if="signatureFileName"
                                        class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                                        <div class="flex items-center gap-2 text-sm text-green-700">
                                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span class="truncate">{{ signatureFileName }}</span>
                                        </div>
                                    </div>
                                    <p v-if="signatureError" class="text-red-600 text-xs mt-1">{{ signatureError }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- Submit Button Section -->
                <div class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] overflow-hidden">
                    <div class="p-4 sm:p-6 lg:p-8">
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div class="flex items-center gap-3 order-2 sm:order-1">
                                <div
                                    class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3 h-3 text-red-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                        </path>
                                    </svg>
                                </div>
                                <span class="text-sm text-gray-600">ช่องที่มีเครื่องหมาย <span
                                        class="text-red-600 font-semibold">*</span> จำเป็นต้องกรอก</span>
                            </div>
                            <button type="submit" :disabled="isSubmitting"
                                class="px-8 py-4 bg-gradient-to-r from-[#184c36] to-[#b6e388] hover:from-[#b6e388] hover:to-[#184c36] disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed order-1 sm:order-2 w-full sm:w-auto">
                                <span v-if="!isSubmitting" class="flex items-center justify-center gap-3">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    สมัครสมาชิก Partner
                                </span>
                                <span v-else class="flex items-center justify-center gap-3">
                                    <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    กำลังดำเนินการ...
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { VueSignaturePad } from 'vue-signature-pad';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RecycleIcon } from '../../icons';

// Components
const signaturePadRef = ref(null);

const router = useRouter()

// Form data
const form = reactive({
    // ข้อมูลส่วนตัว
    username: '',
    password: '',
    title: '',
    fullName: '',
    personalId: '',
    personalPhone: '',
    personalEmail: '',
    personalAddress: '',
    personalProvinceId: '',
    personalProvince: '',
    personalDistrictId: '',
    personalDistrict: '',
    personalSubdistrictId: '',
    personalSubdistrict: '',
    personalPostalCode: '',

    // ข้อมูลบริษัท
    companyName: '',
    companyTaxId: '',
    companyAddress: '',
    companyProvinceId: '',
    companyProvince: '',
    companyDistrictId: '',
    companyDistrict: '',
    companySubdistrictId: '',
    companySubdistrict: '',
    companyPostalCode: '',
    companyPhone: '',
    companyEmail: '',
    shopLatitude: '',
    shopLongitude: '',
    shopImages: '',

    // ไฟล์
    idCardImage: '',
    companyStampImage: '',
    companyLogo: '',
    companyDocuments: [],

    // ลายเซ็นต์
    signatoryName: '',
    signatoryAuthority: 'ผู้มีอำนาจลงนาม',
    signatoryPosition: '',
    signatureType: 'handwritten',
    signatureImage: ''
});

// ข้อมูลสถานที่
const provinces = ref([]);
const personalDistricts = ref([]);
const personalSubdistricts = ref([]);
const companyDistricts = ref([]);
const companySubdistricts = ref([]);
const shopImageFileName = ref('');
// ข้อผิดพลาด
const usernameError = ref('');
const personalIdError = ref('');
const phoneError = ref('');
const emailError = ref('');
const taxIdError = ref('');
const companyEmailError = ref('');
const documentsError = ref('');
const signaturePad = ref(null)
// สถานะ
const isSubmitting = ref(false);

const idCardFileName = ref('');
const stampFileName = ref('');
const logoFileName = ref('');
const signatureFileName = ref('');
const documentFileNames = ref(['', '', '', '']);

const stampError = ref('');
const logoError = ref('');

// โหลดข้อมูลเมื่อเริ่มต้น
onMounted(async () => {
    await fetchProvincesAmphureTambon()
});

const tempFiles = reactive({
    idCard: null,
    stamp: null,
    logo: null,
    documents: [],
    signature: null,
    shopImage: null
});

const fetchProvincesAmphureTambon = async () => {
    try {
        const response = await axios.get(
            'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json'
        );
        // เรียงลำดับจังหวัดตามตัวอักษร ก-ฮ
        provinces.value = response.data.sort((a, b) => a.name_th.localeCompare(b.name_th, 'th'));

    } catch (error) {
        console.error('Error fetching provinces: ', error);
    }
};

// โหลดข้อมูลอำเภอ (ส่วนตัว)
const loadPersonalDistricts = async () => {
    if (!form.personalProvinceId) return;

    const province = provinces.value.find(p => p.id == form.personalProvinceId);
    if (province) {
        form.personalProvince = province.name_th; // Set Thai province name
        personalDistricts.value = province.amphure || [];

        // Reset dependent fields
        form.personalDistrictId = '';
        form.personalDistrict = '';
        form.personalSubdistrictId = '';
        form.personalSubdistrict = '';
        form.personalPostalCode = '';
        personalSubdistricts.value = [];
    }
};

// โหลดข้อมูลตำบล (ส่วนตัว)
const loadPersonalSubdistricts = async () => {
    if (!form.personalDistrictId) return;

    const district = personalDistricts.value.find(d => d.id == form.personalDistrictId);
    if (district) {
        form.personalDistrict = district.name_th; // Set Thai district name
        personalSubdistricts.value = district.tambon || [];

        // Reset dependent fields
        form.personalSubdistrictId = '';
        form.personalSubdistrict = '';
        form.personalPostalCode = '';
    }
};

// โหลดรหัสไปรษณีย์ (ส่วนตัว)
const loadPersonalPostalCode = async () => {
    if (!form.personalSubdistrictId) return;

    const subdistrict = personalSubdistricts.value.find(s => s.id == form.personalSubdistrictId);
    if (subdistrict) {
        form.personalSubdistrict = subdistrict.name_th; // Set Thai subdistrict name
        form.personalPostalCode = subdistrict.zip_code || '';
    }
};

// โหลดข้อมูลอำเภอ (บริษัท)
const loadCompanyDistricts = async () => {
    if (!form.companyProvinceId) return;

    const province = provinces.value.find(p => p.id == form.companyProvinceId);
    if (province) {
        form.companyProvince = province.name_th;
        companyDistricts.value = province.amphure || [];

        // Reset dependent fields
        form.companyDistrictId = '';
        form.companyDistrict = '';
        form.companySubdistrictId = '';
        form.companySubdistrict = '';
        form.companyPostalCode = '';
        companySubdistricts.value = [];
    }
};

// โหลดข้อมูลตำบล (บริษัท)
const loadCompanySubdistricts = async () => {
    if (!form.companyDistrictId) return;

    const district = companyDistricts.value.find(d => d.id == form.companyDistrictId);
    if (district) {
        form.companyDistrict = district.name_th;
        companySubdistricts.value = district.tambon || [];

        // Reset dependent fields
        form.companySubdistrictId = '';
        form.companySubdistrict = '';
        form.companyPostalCode = '';
    }
};

// โหลดรหัสไปรษณีย์ (บริษัท)
const loadCompanyPostalCode = async () => {
    if (!form.companySubdistrictId) return;

    const subdistrict = companySubdistricts.value.find(s => s.id == form.companySubdistrictId);
    if (subdistrict) {
        form.companySubdistrict = subdistrict.name_th;
        form.companyPostalCode = subdistrict.zip_code || '';
    }
};

// ตรวจสอบเอกสาร
const checkDocuments = () => {
    // ตรวจสอบทั้งไฟล์ที่เลือกและไฟล์ที่อัพโหลดแล้ว
    const hasTempDocuments = tempFiles.documents?.some(doc => doc !== null && doc !== undefined);
    const hasUploadedDocuments = form.companyDocuments.some(doc => doc && doc.url);

    const isValid = hasTempDocuments || hasUploadedDocuments;

    documentsError.value = isValid ? '' : 'กรุณาอัพโหลดเอกสารอย่างน้อย 1 ฉบับ';
    return isValid;
};


// เลือกรูปบัตรประชาชน (ยังไม่อัพโหลด)
const handleIdCardSelect = (event) => {
    form.idCardImage = ''; // ล้าง URL เดิม
    const file = event.target.files[0];
    if (file) {
        tempFiles.idCard = file;
        idCardFileName.value = file.name;
    }
    event.target.value = ''; // รีเซ็ต input file
};

const handleShopImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        tempFiles.shopImage = file;
        shopImageFileName.value = file.name;
    }
    event.target.value = '';
};

// เลือกตราประทับบริษัท (ยังไม่อัพโหลด)
const handleStampSelect = (event) => {
    form.companyStampImage = ''; // ล้าง URL เดิม
    const file = event.target.files[0];
    if (file) {
        tempFiles.stamp = file;
        stampFileName.value = file.name;
    }
    event.target.value = ''; // รีเซ็ต input file
};

// เลือกโลโก้บริษัท (ยังไม่อัพโหลด)
const handleLogoSelect = (event) => {
    form.companyLogo = ''; // ล้าง URL เดิม
    const file = event.target.files[0];
    if (file) {
        tempFiles.logo = file;
        logoFileName.value = file.name;
    }
    event.target.value = ''; // รีเซ็ต input file
};

// เลือกเอกสารบริษัท (ยังไม่อัพโหลด)
const handleDocSelect = (event, index) => {
    const file = event.target.files[0];
    if (file) {
        // เก็บไฟล์ชั่วคราว
        if (!tempFiles.documents) {
            tempFiles.documents = [];
        }
        tempFiles.documents[index] = file;
        // บันทึกชื่อไฟล์
        documentFileNames.value[index] = file.name;
    }
    event.target.value = ''; // รีเซ็ต input file
};

// เลือกลายเซ็นต์ (ยังไม่อัพโหลด)
const handleSignatureSelect = (event) => {
    form.signatureImage = ''; // ล้าง URL เดิม
    const file = event.target.files[0];
    if (file) {
        tempFiles.signature = file;
        signatureFileName.value = file.name;
        form.signatureImage = file;
    }

};


// เมธอดสำหรับอัพโหลดไฟล์เดียว
const uploadFile = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('files', file);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/partners/upload`, formData, {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.files[0].url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

// เมธอดสำหรับอัพโหลดไฟล์ทั้งหมด
const uploadAllFiles = async () => {
    const uploadPromises = [];

    // รูปบัตรประชาชน
    if (tempFiles.idCard) {
        const renamed = new File([tempFiles.idCard], `iden-${tempFiles.idCard.name}`, { type: tempFiles.idCard.type });
        uploadPromises.push(
            uploadFile(renamed).then(url => {
                form.idCardImage = url;
            })
        );
    }

    // ตราประทับ
    if (tempFiles.stamp) {
        const renamed = new File([tempFiles.stamp], `stamp-${tempFiles.stamp.name}`, { type: tempFiles.stamp.type });
        uploadPromises.push(
            uploadFile(renamed).then(url => {
                form.companyStampImage = url;
            })
        );
    }

    // โลโก้
    if (tempFiles.logo) {
        const renamed = new File([tempFiles.logo], `logo-${tempFiles.logo.name}`, { type: tempFiles.logo.type });
        uploadPromises.push(
            uploadFile(renamed).then(url => {
                form.companyLogo = url;
            })
        );
    }

    if (tempFiles.shopImage) {
        const renamed = new File([tempFiles.shopImage], `shopImage-${tempFiles.shopImage.name}`, { type: tempFiles.shopImage.type });
        uploadPromises.push(
            uploadFile(renamed).then(url => {
                form.shopImages = url; // เก็บเป็น array ตามที่กำหนดในโมเดล
            })
        );
    }

    // เอกสาร
    tempFiles.documents.forEach((file, index) => {
        if (file) {
            const renamed = new File([file], `doc-${index + 1}-${file.name}`, { type: file.type });
            uploadPromises.push(
                uploadFile(renamed).then(url => {
                    form.companyDocuments[index] = {
                        name: renamed.name,
                        url: url
                    };
                })
            );
        }
    });

    // ลายเซ็น
    if (form.signatureType === 'upload' && tempFiles.signature) {
        const renamed = new File([tempFiles.signature], `signature-${tempFiles.signature.name}`, { type: tempFiles.signature.type });
        uploadPromises.push(
            uploadFile(renamed).then(url => {
                form.signatureImage = url;
            })
        );
    }

    await Promise.all(uploadPromises);
};


const fillSampleData = () => {
    // ยืนยันก่อนกรอกข้อมูลอัตโนมัติ
    Swal.fire({
        title: 'กรอกข้อมูลอัตโนมัติ',
        text: 'คุณต้องการกรอกข้อมูลตัวอย่างหรือไม่? หลังจากกรอกแล้วคุณสามารถแก้ไขข้อมูลได้',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'กรอกข้อมูล',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ข้อมูลส่วนตัว
            form.username = 'partnerdemo';
            form.password = 'Password123';
            form.title = 'นาย';
            form.fullName = 'ทดสอบ สมัครสมาชิก';
            form.personalId = '1234567890123';
            form.personalPhone = '0812345678';
            form.personalEmail = 'test.partner@example.com';
            form.personalAddress = '123 ถนนตัวอย่าง แขวงทดสอบ';

            // ข้อมูลบริษัท
            form.companyName = 'บริษัท ทดสอบ จำกัด';
            form.companyTaxId = '1234567890123';
            form.companyAddress = '456 ถนนบริษัท แขวงธุรกิจ';
            form.companyPhone = '0223456781';
            form.companyEmail = 'company@example.com';


            // ข้อมูลลายเซ็นต์
            form.signatoryName = 'ทดสอบ ลงนาม';
            form.signatoryPosition = 'ผู้จัดการทั่วไป';
            form.signatoryAuthority = 'ผู้มีอำนาจลงนาม';
            form.signatureType = 'handwritten';

            Swal.fire('กรอกข้อมูลเรียบร้อย', 'คุณสามารถแก้ไขข้อมูลได้ตามต้องการ', 'success');
        }
    });
};


// ล้างลายเซ็นต์
const clearSignature = () => {
    if (signaturePad.value) {
        signaturePad.value.clearSignature()
    }
}



const submitForm = async () => {

    try {
        // Validate required fields
        // if (!tempFiles.stamp) {
        //     stampError.value = 'กรุณาอัพโหลดตราประทับบริษัท';
        //     return;
        // }

        // if (!tempFiles.logo) {
        //     logoError.value = 'กรุณาอัพโหลดโลโก้บริษัท';
        //     return;
        // }

        // Handle signature
        if (form.signatureType === 'handwritten' && signaturePad.value) {
            const { isEmpty, data } = signaturePad.value.saveSignature();
            if (isEmpty) {
                Swal.fire('กรุณาเซ็นชื่อก่อน', '', 'warning');
                return;
            }
            form.signatureImage = data;
        }

        isSubmitting.value = true;

        // Show loading
        Swal.fire({
            title: 'กำลังส่งข้อมูล...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        await uploadAllFiles();

        // log ข้อมูลที่กำลังจะส่งไป
        console.log('Form data ที่จะส่ง:', form);

        console.log('Before submission:', {
            idCardImage: form.idCardImage,
            companyStampImage: form.companyStampImage,
            companyLogo: form.companyLogo,
            signatureImage: form.signatureImage,
            addressFields: {
                companySubdistrict: form.companySubdistrict,
                companyDistrict: form.companyDistrict,
                personalSubdistrict: form.personalSubdistrict,
                personalDistrict: form.personalDistrict
            }
        });

        // ส่งข้อมูลไปยังเซิร์ฟเวอร์
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/partners/register`, form);

        if (response.data.success) {
            Swal.fire('สมัครสมาชิกสำเร็จ', '', 'success');
            resetForm();

            router.push('/')
        } else {
            Swal.fire('สมัครสมาชิกไม่สำเร็จ', response.data.error || '', 'error');
        }
    } catch (error) {
        console.error('Error submitting form:', error);

        if (error.response && error.response.data) {
            const { data } = error.response;

            if (data.error === 'ข้อมูลซ้ำกับในระบบ' && data.conflicts) {
                const conflictMessages = {
                    'ชื่อผู้ใช้': 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว',
                    'เลขบัตรประชาชน': 'เลขบัตรประชาชนนี้ถูกใช้ไปแล้ว',
                    'เบอร์โทรศัพท์ส่วนตัว': 'เบอร์โทรศัพท์นี้ถูกใช้ไปแล้ว',
                    'อีเมลส่วนตัว': 'อีเมลนี้ถูกใช้ไปแล้ว',
                    'เลขประจำตัวผู้เสียภาษี': 'เลขประจำตัวผู้เสียภาษีนี้ถูกใช้ไปแล้ว',
                    'อีเมลบริษัท': 'อีเมลบริษัทนี้ถูกใช้ไปแล้ว'
                };

                const messages = data.conflicts.map(conflict => conflictMessages[conflict] || conflict);
                Swal.fire('สมัครสมาชิกไม่สำเร็จ', messages.join('<br>'), 'error');
            } else {
                Swal.fire('สมัครสมาชิกไม่สำเร็จ', data.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก', 'error');
            }
        } else {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถสมัครสมาชิกได้ในขณะนี้', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const testUpload = () => {
    uploadAllFiles()
}

// รีเซ็ตฟอร์ม
const resetForm = () => {
    // Reset form values
    Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) {
            form[key] = [];
        } else if (typeof form[key] === 'boolean') {
            form[key] = false;
        } else if (key === 'signatoryAuthority') {
            form[key] = 'ผู้มีอำนาจลงนาม';
        } else if (key === 'signatureType') {
            form[key] = 'handwritten';
        } else {
            form[key] = '';
        }
    });

    // Clear signature
    if (signaturePadRef.value) {
        signaturePadRef.value.clearSignature();
    }

    // Reset errors
    usernameError.value = '';
    personalIdError.value = '';
    phoneError.value = '';
    emailError.value = '';
    taxIdError.value = '';
    companyEmailError.value = '';
    documentsError.value = '';
    stampError.value = '';
    logoError.value = '';

    // Reset file names
    idCardFileName.value = '';
    stampFileName.value = '';
    logoFileName.value = '';
    signatureFileName.value = '';
    documentFileNames.value = ['', '', '', ''];

    // Reset tempFiles
    tempFiles.idCard = null;
    tempFiles.stamp = null;
    tempFiles.logo = null;
    tempFiles.documents = [];
    tempFiles.signature = null;
};

const goBack = () => {
    router.back();
};
</script>

<style scoped>
.partner-register {
    min-height: 100vh;
}

.signature-container {
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 0.5rem;
}

.upload-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border: 2px dashed #e5e7eb;
    border-radius: 0.75rem;
    background-color: #f9fafb;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    cursor: pointer;
}

.upload-button:hover {
    border-color: #84f857;
    background-color: #eefae8;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(179, 239, 68, 0.1), 0 2px 4px -1px rgba(179, 239, 68, 0.06);
}

.upload-button:active {
    transform: translateY(0);
}

.upload-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2e5200;
    background-color: #f1fee2;
    border-radius: 50%;
    padding: 0.5rem;
}

.upload-text {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
}

.upload-hint {
    font-size: 0.75rem;
    color: #6b7280;
}

.upload-button:hover .upload-icon {
    background-color: #b6ffa0;
    color: #276901;
}

.upload-button:hover .upload-text {
    color: #276901;
}
</style>