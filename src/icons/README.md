# SVG Icons Usage Guide

## วิธีการใช้งาน SVG Icons ในโปรเจค

### 1. การสร้าง SVG Icon ใหม่

1. สร้างไฟล์ `.vue` ใหม่ในโฟลเดอร์ `src/icons/`
2. ใช้ template ด้านล่างเป็นโครงสร้างพื้นฐาน:

```vue
<template>
  <svg 
    :width="width" 
    :height="height" 
    viewBox="0 0 [width] [height]" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <!-- ใส่ SVG path ตรงนี้ -->
  </svg>
</template>

<script>
export default {
  name: 'IconName',
  props: {
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
```

### 2. การ Export Icon

เพิ่ม export ในไฟล์ `src/icons/index.js`:

```javascript
export { default as IconName } from './IconName.vue'
```

### 3. การใช้งานใน Component

```vue
<template>
  <div>
    <!-- ใช้งานแบบพื้นฐาน -->
    <LogoIcon />
    
    <!-- กำหนดขนาด -->
    <LogoIcon :width="100" :height="50" />
    
    <!-- เพิ่ม CSS class -->
    <LogoIcon :width="44" :height="40" class="my-custom-class" />
  </div>
</template>

<script setup>
import { LogoIcon } from '../icons';
</script>
```

### 4. ตัวอย่างการใช้งาน

```vue
<template>
  <header>
    <div class="logo-container">
      <LogoIcon :width="44" :height="40" class="h-10" />
    </div>
  </header>
</template>

<script setup>
import { LogoIcon } from '../icons';
</script>
```

### 5. Responsive Design

```vue
<template>
  <div>
    <!-- ปรับขนาดตามหน้าจอ -->
    <LogoIcon class="w-32 h-8 sm:w-36 sm:h-9 md:w-40 md:h-10" />
    
    <!-- ใช้ max-width และ max-height -->
    <LogoIcon class="max-w-40 max-h-10 w-auto h-auto" />
    
    <!-- ปรับขนาดแบบ fluid -->
    <LogoIcon class="w-full max-w-xs h-auto" />
  </div>
</template>
```

**Breakpoints ที่แนะนำ:**
- `w-32 h-8` - Mobile (หน้าจอเล็ก)
- `sm:w-36 sm:h-9` - Small screens (640px+)
- `md:w-40 md:h-10` - Medium screens (768px+)
- `lg:w-44 lg:h-11` - Large screens (1024px+)

## ข้อดีของการใช้ SVG Icons

1. **Scalable**: สามารถปรับขนาดได้โดยไม่เสียคุณภาพ
2. **Customizable**: สามารถเปลี่ยนสีและ style ได้ผ่าน CSS
3. **Lightweight**: ขนาดไฟล์เล็กกว่า PNG/JPG
4. **Accessible**: สามารถเพิ่ม aria-label และ accessibility features ได้
5. **Type-safe**: ใช้ TypeScript ได้อย่างเต็มที่

## Tips

- ใช้ `viewBox` เพื่อกำหนดพื้นที่แสดงผลของ SVG
- ใช้ props `width` และ `height` เพื่อปรับขนาด
- ใช้ `className` เพื่อเพิ่ม CSS classes
- ควรตั้งชื่อ component ให้สื่อความหมาย 