<template>
  <div class="magic">
    <div class="magic_left">
      <button v-if="started" @click="reset" class="magic_left-lamp">
        <img alt="Lamp" src="@/assets/img/lamp2.jpg" />
      </button>
      <button v-else @click="setStart" class="magic_left-lamp">
        <img alt="Lamp" src="@/assets/img/lamp1.jpg" />
      </button>
      <p>Видишь справа иконки?</p>
      <p>Запомни любую из них</p>
      <p>Запомнил?</p>
      <p>Жми на лампочку</p>
    </div>
    <div class="magic_right">
      <button v-for="(col, i) of cols" :key="`col-${i}`">
        <i
          v-for="(item, j) of col"
          :key="`item-${j}`"
          :class="item"
          class="mdi"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import useMagic from "@/core";

export default defineComponent({
  name: "MagicView",
  setup() {
    const { init, cols } = useMagic();

    const started = ref<boolean>(false);

    function setStart() {
      started.value = true;
    }

    function reset() {
      started.value = false;
    }

    onBeforeMount(() => {
      init();
    });

    return {
      started,
      setStart,
      reset,
      cols,
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

  &_left {
    width: 400px;

    &-lamp {
      border: none;
      background: #000;
    }
  }

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
      gap: 5px;

      i {
        font-size: 22px;
        color: #fff;
      }
    }
  }

  img {
    width: auto;
    height: 200px;
  }

  h1 {
    font-size: 42px;
    color: #fff;
  }

  p {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    font-family: "ComfortaaRegular";
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
