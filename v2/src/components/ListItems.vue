<template>
  <div class="list-items">
    <button v-for="(col, i) of cols" :key="`col-${i}`" @click="onSelect(i)">
      <i
        v-for="(item, j) of col"
        :key="`item-${j}`"
        :class="item"
        class="mdi"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItems",
  props: {
    cols: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["on-select"],
  setup(_, { emit }) {
    function onSelect(index: number) {
      emit("on-select", index);
    }

    return {
      onSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-items {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    button {
      i {
        opacity: 0.8;
      }
    }
  }

  button {
    display: flex;
    flex-direction: column;
    background: #000;
    border: none;
    padding: 0 10vw;
    transition: transform 0.2s ease;

    i {
      font-size: 1.2rem;
      color: #fff;
    }

    &:hover {
      transform: scale(1.01);

      i {
        opacity: 1;
      }
    }
  }
}
</style>
