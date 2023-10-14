<template>
  <div class="step-2 px-2">
    <button ref="btnRef" @click="onPrev" class="mb-10">
      <img alt="Lamp" src="@/assets/img/lamp2.jpg" />
    </button>
    <p class="mb-5">
      Теперь, жми на тот ряд, где находится твоя выбранная иконка
    </p>
    <p class="mb-5">После нажатия иконки будут перемешиваться</p>
    <p>Жми на нужный ряд до тех пор, пока не произойдет магия ;D</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { playAudio } from "@/core/helpers";

export default defineComponent({
  name: "StepTwo",
  emits: ["on-prev"],
  setup(_, { emit }) {
    const btnRef = ref();

    function onPrev() {
      playAudio("/src/assets/audio/lightSwitch.mp3");
      emit("on-prev");
    }

    onMounted(() => {
      btnRef.value.classList.add("animated", "swing");
    });

    return {
      onPrev,
      btnRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.step-2 {
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
