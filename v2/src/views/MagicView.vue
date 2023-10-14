<template>
  <div class="magic">
    <StepOne v-if="step === STEPS.step1" @on-next="toStep2" />
    <StepTwo v-else-if="step === STEPS.step2" @on-prev="toStep1" />
    <ResultComp v-if="result" :result="result" />
    <ListItems
      v-else
      :cols="cols"
      @on-select="onSelectCol"
      :class="{ 'pointer-events-none': step === STEPS.step1 }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import useMagic from "@/core";

import StepOne from "@/components/StepOne.vue";
import StepTwo from "@/components/StepTwo.vue";
import ResultComp from "@/components/ResultComp.vue";
import ListItems from "@/components/ListItems.vue";

enum STEPS {
  step1 = 1,
  step2 = 2,
}

export default defineComponent({
  name: "MagicView",
  components: {
    StepOne,
    StepTwo,
    ResultComp,
    ListItems,
  },
  setup() {
    const { init, cols, setCol, result, reset } = useMagic();

    const step = ref<number>(STEPS.step1);

    function toStep1() {
      reset();
      step.value = STEPS.step1;
    }

    function toStep2() {
      step.value = STEPS.step2;
    }

    function onSelectCol(col: number) {
      setCol(col);
    }

    onBeforeMount(() => {
      init();
    });

    return {
      cols,
      toStep1,
      toStep2,
      onSelectCol,
      result,
      step,
      STEPS,
    };
  },
});
</script>

<style lang="scss" scoped>
.magic {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background: #000;
  box-sizing: border-box;

  &_right {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20vw;

    button {
      display: flex;
      flex-direction: column;
      background: #000;
      border: none;

      i {
        font-size: 1.2rem;
        color: #fff;
      }
    }
  }

  &_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &-text {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>
