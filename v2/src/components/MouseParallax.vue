<template>
  <div ref="mouseParallax" class="mouse-parallax">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "MouseParallax",
  props: {
    shift: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const mouseParallax = ref();

    function parallax(event: MouseEvent) {
      if (mouseParallax.value) {
        const position = Number(props.shift || 0);
        const x = (window.innerWidth - event.pageX * position) / 90;
        const y = (window.innerHeight - event.pageY * position) / 90;
        mouseParallax.value.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }
    }

    onMounted(() => {
      document.addEventListener("mousemove", parallax);
    });

    onUnmounted(() => {
      document.removeEventListener("mousemove", parallax);
    });

    return {
      mouseParallax,
    };
  },
});
</script>
