<template>
  <div class="magic">
    <StepperComp @toggle="toggleLock" />
    <ResultComp v-if="result" :result="result" />
    <ListItems
      v-else
      :cols="cols"
      @on-select="onSelectCol"
      :class="{ 'pointer-events-none': isLocked }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch } from "vue";
import useMagic from "@/core";

import StepperComp from "@/components/StepperComp.vue";
import ResultComp from "@/components/ResultComp.vue";
import ListItems from "@/components/ListItems.vue";

export default defineComponent({
  name: "MagicView",
  components: {
    StepperComp,
    ResultComp,
    ListItems,
  },
  setup() {
    const { init, cols, setCol, result, reset } = useMagic();

    const isLocked = ref(true);

    function toggleLock(locked: boolean) {
      if (!isLocked.value) {
        reset();
      }
      isLocked.value = locked;
    }

    function onSelectCol(col: number) {
      setCol(col);
    }

    watch(result, (r) => {
      if (r) {
        setTimeout(() => {
          reset();
        }, 3000);
      }
    });

    onBeforeMount(() => {
      init();
    });

    return {
      cols,
      isLocked,
      toggleLock,
      onSelectCol,
      reset,
      result,
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
