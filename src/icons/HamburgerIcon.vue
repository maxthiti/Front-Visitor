<template>
  <svg 
    :width="width" 
    :height="height" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</template>

<script>
export default {
  name: 'HamburgerIcon',
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