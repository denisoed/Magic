<template>
  <div class="step-1 px-2">
    <button ref="btnRef" @click="onNext" class="mb-10">
      <img alt="Lamp" src="@/assets/img/lamp1.jpg" />
    </button>
    <p>Видишь справа иконки?</p>
    <p class="mb-5">Запомни любую из них</p>
    <p class="mb-5">Запомнил?</p>
    <p>Жми на лампочку</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { playAudio } from "@/core/helpers";

export default defineComponent({
  name: "StepOne",
  emits: ["on-next"],
  setup(_, { emit }) {
    const btnRef = ref();

    function onNext() {
      playAudio("/src/assets/audio/lightSwitch.mp3");
      emit("on-next");
    }

    onMounted(() => {
      btnRef.value.classList.add("animated", "swing");
    });

    return {
      onNext,
      btnRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.step-1 {
  width: 450px;
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
