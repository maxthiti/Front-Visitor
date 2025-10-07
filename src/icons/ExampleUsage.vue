<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">SVG Icons Usage Examples</h1>
    
    <!-- Logo Icon Examples -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Logo Icon Examples</h2>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="flex flex-col items-center">
          <LogoIcon />
          <span class="text-sm mt-2">Default size</span>
        </div>
        <div class="flex flex-col items-center">
          <LogoIcon :width="100" :height="50" />
          <span class="text-sm mt-2">Custom size</span>
        </div>
        <div class="flex flex-col items-center">
          <LogoIcon :width="44" :height="40" class="border-2 border-gray-300 rounded" />
          <span class="text-sm mt-2">With border</span>
        </div>
      </div>
    </section>

    <!-- Search Icon Examples -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Search Icon Examples</h2>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="flex flex-col items-center">
          <SearchIcon />
          <span class="text-sm mt-2">Default</span>
        </div>
        <div class="flex flex-col items-center">
          <SearchIcon class="text-blue-500" />
          <span class="text-sm mt-2">Blue color</span>
        </div>
        <div class="flex flex-col items-center">
          <SearchIcon :width="32" :height="32" class="text-green-500" />
          <span class="text-sm mt-2">Large green</span>
        </div>
      </div>
    </section>

    <!-- Calendar Icon Examples -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Calendar Icon Examples</h2>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="flex flex-col items-center">
          <CalendarIcon />
          <span class="text-sm mt-2">Default</span>
        </div>
        <div class="flex flex-col items-center">
          <CalendarIcon class="text-red-500" />
          <span class="text-sm mt-2">Red color</span>
        </div>
        <div class="flex flex-col items-center">
          <CalendarIcon :width="40" :height="40" class="text-purple-500" />
          <span class="text-sm mt-2">Large purple</span>
        </div>
      </div>
    </section>

    <!-- Interactive Examples -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Interactive Examples</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Search Input -->
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3">Search Input</h3>
          <div class="relative">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Button with Icon -->
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3">Button with Icon</h3>
          <button class="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            <CalendarIcon class="w-5 h-5" />
            Schedule Event
          </button>
        </div>
      </div>
    </section>

    <!-- Code Examples -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Code Examples</h2>
      <div class="bg-gray-100 p-4 rounded-lg">
        <pre class="text-sm"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Basic usage --&gt;
    &lt;LogoIcon /&gt;
    
    &lt;!-- Custom size --&gt;
    &lt;LogoIcon :width="100" :height="50" /&gt;
    
    &lt;!-- With CSS classes --&gt;
    &lt;SearchIcon class="text-blue-500 w-6 h-6" /&gt;
    
    &lt;!-- In a button --&gt;
    &lt;button class="flex items-center gap-2"&gt;
      &lt;CalendarIcon class="w-5 h-5" /&gt;
      Schedule
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { LogoIcon, SearchIcon, CalendarIcon } from '../icons';
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { LogoIcon, SearchIcon, CalendarIcon } from './index';
</script> 