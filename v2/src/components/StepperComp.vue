<template>
  <div class="stepper px-2" :class="{ 'stepper--bg-white': started }">
    <button ref="btnRef" class="mb-10">
      <img v-if="started" alt="Lamp2" src="@/assets/img/lamp2.jpg" />
      <img v-else alt="Lamp1" src="@/assets/img/lamp1.jpg" />
    </button>
    <!-- Step 1 -->
    <div v-if="!started" class="stepper_start-info h-[150px]">
      <p class="text-white mb-3">1. Видишь справа иконки?</p>
      <p class="text-white mb-3">2. Запомни любую из них</p>
      <p class="text-white">3. Дергай рубильник</p>
    </div>
    <div v-else class="stepper_magic-info h-[150px]">
      <p class="text-black">
        Теперь, жми на тот ряд, где находится твоя выбранная иконка.
      </p>
      <p class="text-black">...и так несколько раз</p>
    </div>
    <LightSwitcher @enable="toggle(true)" @disable="toggle(false)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import LightSwitcher from "@/components/LightSwitcher.vue";

export default defineComponent({
  name: "StepperComp",
  components: {
    LightSwitcher,
  },
  emits: ["toggle"],
  setup(_, { emit }) {
    const btnRef = ref();
    const started = ref(false);

    function setAnim() {
      btnRef.value.classList.add("animated", "swing");
    }

    function clearAnim() {
      btnRef.value.classList.remove("animated", "swing");
    }

    function toggle(bool: boolean) {
      started.value = bool;
      setAnim();
      emit("toggle", !bool);
    }

    watch(started, () => {
      setTimeout(() => {
        clearAnim();
      }, 1500);
    });

    return {
      btnRef,
      started,
      toggle,
    };
  },
});
</script>

<style lang="scss" scoped>
.stepper {
  width: 450px;
  height: 100%;

  &--bg-white {
    background: #fff;
  }

  img {
    width: auto;
    height: 200px;
  }

  p {
    font-size: 18px;
    font-weight: 600;
    font-family: "ComfortaaRegular";
  }
}
</style>
