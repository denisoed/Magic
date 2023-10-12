<template>
  <div class="home">
    <MouseParallax :shift="5">
      <img alt="Start Face" src="@/assets/img/face.png" />
    </MouseParallax>
    <div class="home_info">
      <div class="home_info-text">
        <h1>Хеллоу Амиго</h1>
        <p class="text-xl opacity-90">Хочешь покажу магию?</p>
        <p class="text-md mt-1 opacity-50">
          Отгадаю то, что ты загадал в уме <i class="mdi mdi-brain text-xl" />
        </p>
      </div>
      <router-link to="/magic">Покажи ></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MouseParallax from "@/components/MouseParallax.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MouseParallax,
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #000;
  padding: 20vh;
  box-sizing: border-box;

  img {
    width: auto;
    height: 55vh;
  }

  h1 {
    font-size: 42px;
    color: #fff;
  }

  p {
    color: #fff;
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

    a {
      color: #000;
      background: #fff;
      font-size: 22px;
      padding: 5px 10px;
      text-decoration: none;
      border-radius: 4px;
      font-family: "RubikMonoOneRegular";
    }
  }
}
</style>
