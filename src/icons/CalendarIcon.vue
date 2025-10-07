<template>
  <svg 
    :width="width" 
    :height="height" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  name: 'CalendarIcon',
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