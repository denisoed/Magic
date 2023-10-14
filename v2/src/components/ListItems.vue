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
    <div class="list-items_image">
      <MouseParallax :shift="5">
        <img alt="Start Face" src="@/assets/img/face.png" />
      </MouseParallax>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MouseParallax from "@/components/MouseParallax.vue";
import { playAudio } from "@/core/helpers";

export default defineComponent({
  name: "ListItems",
  components: {
    MouseParallax,
  },
  props: {
    cols: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["on-select"],
  setup(_, { emit }) {
    function onSelect(index: number) {
      playAudio("clickCol.mp3");
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
  position: relative;
  overflow: hidden;

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
    border: none;
    padding: 0 10vw;
    z-index: 2;
    transition: all 0.2s ease;

    i {
      font-size: 1.2rem;
      color: #fff;
      transition: all 0.2s ease;
    }

    &:hover {
      transform: scale(1.01);

      i {
        opacity: 1;
      }
    }
  }

  &_image {
    width: 40vw;
    position: absolute;
    z-index: 1;
    opacity: 0.05;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      transform: scaleX(-1);
    }
  }
}
</style>
