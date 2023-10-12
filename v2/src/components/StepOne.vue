<template>
  <div class="step-1 px-2">
    <button @click="onNext" class="mb-10">
      <img alt="Lamp" src="@/assets/img/lamp1.jpg" />
    </button>
    <p>Видишь справа иконки?</p>
    <p class="mb-5">Запомни любую из них</p>
    <p class="mb-5">Запомнил?</p>
    <p>Жми на лампочку</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { playAudio } from "@/core/helpers";

export default defineComponent({
  name: "StepOne",
  emits: ["on-next"],
  setup(_, { emit }) {
    function onNext() {
      // playAudio("./src/assets/audio/LightSwitch.mp3");
      emit("on-next");
    }
    return {
      onNext,
    };
  },
});
</script>

<style lang="scss" scoped>
.step-1 {
  width: 350px;
  height: 100%;

  img {
    width: auto;
    height: 200px;
  }

  p {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    font-family: "ComfortaaRegular";
  }
}
</style>
