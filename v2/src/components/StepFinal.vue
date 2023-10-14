<template>
  <div class="step-final px-2">
    <button ref="btnRef" @click="onPrev" class="mb-10">
      <img alt="Lamp" src="@/assets/img/lamp2.jpg" />
    </button>
    <p class="mb-5">Еще разок?</p>
    <p class="mb-5">Жми на лампочку</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { playAudio } from "@/core/helpers";

export default defineComponent({
  name: "StepFinal",
  emits: ["on-prev"],
  setup(_, { emit }) {
    function onPrev() {
      playAudio("/src/assets/audio/lightSwitch.mp3");
      emit("on-prev");
    }

    return {
      onPrev,
    };
  },
});
</script>

<style lang="scss" scoped>
.step-final {
  width: 450px;
  height: 100%;
  background: #fff;

  img {
    width: auto;
    height: 200px;
  }

  p {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    font-family: "ComfortaaRegular";
  }
}
</style>
