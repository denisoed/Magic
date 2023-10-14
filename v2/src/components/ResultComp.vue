<template>
  <div class="result-comp w-full h-full flex items-center justify-center">
    <i :class="result" class="mdi text-white text-[8rem]" />
    <div class="result-comp_image">
      <MouseParallax :shift="5">
        <img alt="Start Face" src="@/assets/img/face.png" />
      </MouseParallax>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import MouseParallax from "@/components/MouseParallax.vue";
import { playAudio } from "@/core/helpers";

export default defineComponent({
  name: "ResultComp",
  components: {
    MouseParallax,
  },
  props: {
    result: {
      type: String,
      default: null,
    },
  },
  setup() {
    onMounted(() => {
      playAudio("eralash.mp3");
    });
  },
});
</script>

<style lang="scss" scoped>
.result-comp {
  position: relative;

  &_image {
    width: 40vw;
    position: absolute;
    z-index: 1;
    opacity: 0.05;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      transform: scaleX(-1);
    }
  }
}
</style>
