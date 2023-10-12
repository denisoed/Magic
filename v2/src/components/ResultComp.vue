<template>
  <div class="result-comp w-full h-full flex items-center justify-center">
    <i :class="result" class="mdi text-white text-[8rem]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResultComp",
  props: {
    result: {
      type: String,
      default: null,
    },
  },
});
</script>
