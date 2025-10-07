# BarNoMenu Component Usage Guide

## Overview
BarNoMenu component now supports back navigation functionality with dynamic page titles.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showBackNavigation` | Boolean | `false` | Show/hide the back navigation header |
| `pageTitle` | String | `''` | Custom page title to display |
| `backRoute` | String | `''` | Specific route to navigate back to (optional) |

## Usage Examples

### Basic Usage (No Back Navigation)
```vue
<template>
    <BarNoMenu />
    <!-- Your page content -->
</template>
```

### With Back Navigation (Auto-detect page title)
```vue
<template>
    <BarNoMenu :showBackNavigation="true" />
    <!-- Your page content -->
</template>
```

### With Custom Page Title
```vue
<template>
    <BarNoMenu 
        :showBackNavigation="true"
        pageTitle="กิจกรรม"
    />
    <!-- Your page content -->
</template>
```

### With Custom Back Route
```vue
<template>
    <BarNoMenu 
        :showBackNavigation="true"
        pageTitle="จัดการพนักงาน"
        backRoute="/homepartner"
    />
    <!-- Your page content -->
</template>
```

## Auto-detected Page Titles

The component automatically detects page titles for these routes:

- `/activity` → "กิจกรรม"
- `/dashboardpartner` → "แดชบอร์ดพาร์ทเนอร์"
- `/manageemployee` → "จัดการพนักงาน"
- `/memberofpartner` → "สมาชิกของพาร์ทเนอร์"
- `/addproduct` → "เพิ่มสินค้า"
- `/recycleorder` → "ออเดอร์รีไซเคิล"
- `/member/orders` → "ออเดอร์ของฉัน"

## Navigation Behavior

- If `backRoute` is provided, clicking the back button navigates to that specific route
- If `backRoute` is not provided, clicking the back button uses `router.back()` (browser back)

## Styling

The back navigation header uses:
- Background color: `#106154` (green)
- Text color: white
- Hover effect: light gray
- Position: Fixed below the main header with `mt-16` margin

## Migration Guide

### Before (Old way)
```vue
<template>
    <BarNoMenu />
    <div class="min-h-screen bg-gray-50">
        <!-- Back Navigation Header -->
        <div class="bg-[#106154] py-4 px-6">
            <div class="flex items-center">
                <button @click="goBackToHomePartner" class="flex items-center text-white hover:text-gray-200 transition-colors">
                    <ChevronLeftIcon class="w-6 h-6 mr-2" />
                    <span class="text-lg font-medium">กิจกรรม</span>
                </button>
            </div>
        </div>
        <!-- Your content -->
    </div>
</template>

<script setup>
function goBackToHomePartner() {
    router.push('/homepartner');
}
</script>
```

### After (New way)
```vue
<template>
    <BarNoMenu 
        :showBackNavigation="true"
        pageTitle="กิจกรรม"
        backRoute="/homepartner"
    />
    <div class="min-h-screen bg-gray-50">
        <!-- Your content (no need for separate back navigation header) -->
    </div>
</template>
```

## Benefits

1. **Less Code**: No need to write separate back navigation headers
2. **Consistent Styling**: All back navigation headers look the same
3. **Easy Maintenance**: Centralized navigation logic
4. **Flexible**: Can customize title and route per page
5. **Auto-detection**: Automatically detects page titles for common routes

