<template>
  <div class="p-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">Responsive SVG Icons Examples</h1>
    
    <!-- Logo Responsive Examples -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Logo Responsive Examples</h2>
      
      <!-- Method 1: Tailwind Breakpoints -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3">Method 1: Tailwind Breakpoints</h3>
        <div class="border rounded-lg p-4 bg-gray-50">
          <LogoIcon class="w-24 h-6 sm:w-32 sm:h-8 md:w-40 md:h-10 lg:w-48 lg:h-12" />
          <p class="text-sm text-gray-600 mt-2">
            Mobile: 96x24px | Small: 128x32px | Medium: 160x40px | Large: 192x48px
          </p>
        </div>
      </div>

      <!-- Method 2: Max-width with Auto -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3">Method 2: Max-width with Auto</h3>
        <div class="border rounded-lg p-4 bg-gray-50">
          <LogoIcon class="max-w-40 max-h-10 w-auto h-auto" />
          <p class="text-sm text-gray-600 mt-2">
            ปรับขนาดอัตโนมัติตาม container แต่ไม่เกิน 160x40px
          </p>
        </div>
      </div>

      <!-- Method 3: Fluid Design -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3">Method 3: Fluid Design</h3>
        <div class="border rounded-lg p-4 bg-gray-50">
          <div class="w-full max-w-md">
            <LogoIcon class="w-full h-auto" />
          </div>
          <p class="text-sm text-gray-600 mt-2">
            ปรับขนาดเต็มความกว้างของ container (ไม่เกิน 384px)
          </p>
        </div>
      </div>

      <!-- Method 4: Container Queries (Modern) -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3">Method 4: Container-based Sizing</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="border rounded-lg p-4 bg-blue-50">
            <LogoIcon class="w-full max-w-32 h-auto" />
            <p class="text-sm text-gray-600 mt-2">Small Container</p>
          </div>
          <div class="border rounded-lg p-4 bg-green-50">
            <LogoIcon class="w-full max-w-40 h-auto" />
            <p class="text-sm text-gray-600 mt-2">Medium Container</p>
          </div>
          <div class="border rounded-lg p-4 bg-purple-50">
            <LogoIcon class="w-full max-w-48 h-auto" />
            <p class="text-sm text-gray-600 mt-2">Large Container</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Icons Responsive -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Other Icons Responsive</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Search Icon -->
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3">Search Icon</h3>
          <div class="flex items-center gap-4">
            <SearchIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span class="text-sm">Responsive Search Icon</span>
          </div>
        </div>

        <!-- Calendar Icon -->
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3">Calendar Icon</h3>
          <div class="flex items-center gap-4">
            <CalendarIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span class="text-sm">Responsive Calendar Icon</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Interactive Demo</h2>
      <div class="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <div class="flex-shrink-0">
            <LogoIcon class="w-20 h-5 sm:w-32 sm:h-8 md:w-40 md:h-10" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold mb-2">Responsive Logo Demo</h3>
            <p class="text-sm text-gray-600">
              ลองปรับขนาดหน้าจอเพื่อดูการเปลี่ยนแปลงของ logo
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Examples -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Code Examples</h2>
      <div class="bg-gray-100 p-4 rounded-lg">
        <pre class="text-sm"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Method 1: Tailwind Breakpoints --&gt;
    &lt;LogoIcon class="w-24 h-6 sm:w-32 sm:h-8 md:w-40 md:h-10 lg:w-48 lg:h-12" /&gt;
    
    &lt;!-- Method 2: Max-width with Auto --&gt;
    &lt;LogoIcon class="max-w-40 max-h-10 w-auto h-auto" /&gt;
    
    &lt;!-- Method 3: Fluid Design --&gt;
    &lt;LogoIcon class="w-full max-w-md h-auto" /&gt;
    
    &lt;!-- Method 4: Container-based --&gt;
    &lt;div class="w-full max-w-32"&gt;
      &lt;LogoIcon class="w-full h-auto" /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { LogoIcon } from '../icons';
&lt;/script&gt;</code></pre>
      </div>
    </section>

    <!-- Best Practices -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Best Practices</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border rounded-lg p-4 bg-green-50">
          <h3 class="font-semibold text-green-800 mb-2">✅ Do's</h3>
          <ul class="text-sm text-green-700 space-y-1">
            <li>• ใช้ Tailwind breakpoints สำหรับ responsive design</li>
            <li>• กำหนด max-width เพื่อป้องกัน icon ใหญ่เกินไป</li>
            <li>• ใช้ aspect ratio ที่เหมาะสม</li>
            <li>• ทดสอบบนหน้าจอหลายขนาด</li>
          </ul>
        </div>
        <div class="border rounded-lg p-4 bg-red-50">
          <h3 class="font-semibold text-red-800 mb-2">❌ Don'ts</h3>
          <ul class="text-sm text-red-700 space-y-1">
            <li>• อย่าใช้ขนาดคงที่สำหรับทุกหน้าจอ</li>
            <li>• อย่าลืมกำหนด max-width</li>
            <li>• อย่าใช้ขนาดที่เล็กเกินไปบน mobile</li>
            <li>• อย่าลืมทดสอบ accessibility</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { LogoIcon, SearchIcon, CalendarIcon } from './index';
</script> 