<template>
  <div class="magic">
    <StepOne @on-next="toStep2" />
    <ListItems :cols="cols" @on-select="onSelectCol" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import useMagic from "@/core";

import StepOne from "@/components/StepOne.vue";
import ListItems from "@/components/ListItems.vue";

enum STEPS {
  step1 = 1,
  step2 = 2,
}

export default defineComponent({
  name: "MagicView",
  components: {
    StepOne,
    ListItems,
  },
  setup() {
    const { init, cols, setCol } = useMagic();

    const step = ref<number>(STEPS.step1);

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
      toStep2,
      onSelectCol,
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
