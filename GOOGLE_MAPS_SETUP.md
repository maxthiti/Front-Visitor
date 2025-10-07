# การตั้งค่า Google Maps API สำหรับ RecycleOrder.vue

## ขั้นตอนการตั้งค่า

### 1. สร้าง Google Cloud Project
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจกต์ใหม่หรือเลือกโปรเจกต์ที่มีอยู่
3. เปิดใช้งาน Google Maps JavaScript API

### 2. สร้าง API Key
1. ไปที่ "APIs & Services" > "Credentials"
2. คลิก "Create Credentials" > "API Key"
3. คัดลอก API Key ที่ได้

### 3. ตั้งค่า API Key ในโค้ด
แก้ไขไฟล์ `frontend/src/views/Orders/RecycleOrder.vue` ในบรรทัดที่ 650:

```javascript
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
```

แทนที่ `YOUR_GOOGLE_MAPS_API_KEY` ด้วย API Key ที่ได้จาก Google Cloud Console

### 4. ตั้งค่า Domain Restrictions (แนะนำ)
ใน Google Cloud Console:
1. ไปที่ "APIs & Services" > "Credentials"
2. คลิกที่ API Key ที่สร้าง
3. ในส่วน "Application restrictions" เลือก "HTTP referrers (web sites)"
4. เพิ่ม domain ที่อนุญาต เช่น:
   - `localhost:3000/*`
   - `yourdomain.com/*`

## ฟีเจอร์ที่เพิ่มเข้ามา

### 1. แผนที่ Google Maps
- แสดงแผนที่เมื่อเลือก "ให้รถเข้ารับสินค้า"
- ตำแหน่งเริ่มต้น: กรุงเทพฯ (13.7563, 100.5018)

### 2. การปักหมุดตำแหน่ง
- คลิกบนแผนที่เพื่อปักหมุดตำแหน่งหน้าบ้าน
- แสดงพิกัดละติจูดและลองจิจูด
- Marker สีเขียวตามธีมของแอป

### 3. การค้นหาตำแหน่งปัจจุบัน
- ปุ่มค้นหาตำแหน่งปัจจุบัน (ไอคอน GPS)
- ใช้ Geolocation API ของเบราว์เซอร์
- แสดงข้อความแจ้งเตือนเมื่อไม่สามารถค้นหาตำแหน่งได้

### 4. การส่งข้อมูล
- ส่งพิกัด lat/lng ไปยัง backend แทนรูปภาพแผนที่
- ตรวจสอบว่ามีการปักหมุดตำแหน่งก่อนส่งข้อมูล
- แสดงข้อมูลตำแหน่งในส่วน Summary

## การทำงานของระบบ

1. **เมื่อเลือก "ให้รถเข้ารับสินค้า"**:
   - โหลด Google Maps API
   - แสดงแผนที่
   - พยายามหาตำแหน่งปัจจุบัน

2. **การปักหมุด**:
   - คลิกบนแผนที่เพื่อวาง marker
   - บันทึกพิกัดใน `selectedLocation`
   - แสดงข้อมูลพิกัด

3. **การส่งข้อมูล**:
   - ตรวจสอบว่ามีการปักหมุดตำแหน่ง
   - ส่งพิกัด lat/lng ไปยัง backend
   - แสดงข้อมูลใน Summary

## ข้อควรระวัง

1. **API Key**: อย่าลืมตั้งค่า domain restrictions เพื่อความปลอดภัย
2. **HTTPS**: Geolocation API ต้องการ HTTPS ใน production
3. **Browser Support**: ตรวจสอบว่าเบราว์เซอร์รองรับ Geolocation API
4. **User Permission**: ผู้ใช้ต้องอนุญาตให้เข้าถึงตำแหน่ง

## การแก้ไขปัญหา

### แผนที่ไม่แสดง
- ตรวจสอบ API Key
- ตรวจสอบการเปิดใช้งาน Google Maps JavaScript API
- ตรวจสอบ domain restrictions

### ไม่สามารถหาตำแหน่งได้
- ตรวจสอบการอนุญาตตำแหน่งในเบราว์เซอร์
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
- ตรวจสอบว่าใช้ HTTPS (ใน production)

### Marker ไม่แสดง
- ตรวจสอบ console สำหรับ JavaScript errors
- ตรวจสอบการโหลด Google Maps API 