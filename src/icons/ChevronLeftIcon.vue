<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="className"
    >
        <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<script>
export default {
    name: 'ChevronLeftIcon',
    props: {
        width: { type: [String, Number], default: 24 },
        height: { type: [String, Number], default: 24 },
        className: { type: String, default: '' }
    }
}
</script> 