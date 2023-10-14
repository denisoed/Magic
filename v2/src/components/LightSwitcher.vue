<template>
  <label class="light-switch" :class="{ 'light-switch--checked': disabled }">
    <div class="panel">
      <div class="screw top">
        <div class="screw__slot"></div>
      </div>
      <div class="switch__hole">
        <div class="switch__groove">
          <div class="switch">
            <div class="switch__shadow-box top">
              <div class="switch__shadow top"></div>
            </div>
            <div class="switch__shadow-box bottom">
              <div class="switch__shadow bottom"></div>
            </div>
            <div class="switch__top" @click="disable">
              <div class="switch__top-outset"></div>
            </div>
            <div class="switch__bottom" @click="enable">
              <div class="switch__bottom-outset"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="screw bottom">
        <div class="screw__slot"></div>
      </div>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { playAudio } from "@/core/helpers";

export default defineComponent({
  name: "LightSwitcher",
  emits: ["enable", "disable"],
  setup(_, { emit }) {
    const disabled = ref(true);

    function enable() {
      if (disabled.value) playAudio("lightSwitch.mp3");
      emit("enable");
      disabled.value = false;
    }

    function disable() {
      if (!disabled.value) playAudio("lightSwitch.mp3");
      disabled.value = true;
      emit("disable");
    }

    return {
      enable,
      disable,
      disabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.light-switch {
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

.panel {
  height: 3 * 70px;
  width: 3 * 45px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: inset -4px -4px 8px rgba(0, 0, 0, 0.25),
    inset 4px 4px 8px rgba(255, 255, 255, 0.5),
    inset 2px 2px 2px rgba(177, 177, 177, 0.25),
    -4px -4px 16px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(0, 0, 0, 0.1),
    4px 4px 2px rgba(0, 0, 0, 0.05), 6px 6px 3px rgba(0, 0, 0, 0.05);
  position: relative;
}

.screw {
  height: 12px;
  width: 12px;
  align-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 100%;
  box-shadow: inset -3px -3px 6px rgba(0, 0, 0, 0.1),
    inset 0 0 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  &.top {
    top: 12px;

    .screw__slot {
      transform: rotate(10deg);
    }
  }

  &.bottom {
    bottom: 12px;

    .screw__slot {
      transform: rotate(-30deg);
    }
  }

  &__slot {
    height: 4px;
    background-color: #eee;
    border-radius: 2px;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2);
    width: calc(100% - 2px);
  }
}

.switch {
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.75),
    -2px -2px 2px rgba(255, 255, 255, 0.75);
  cursor: pointer;
  position: relative;

  &__hole {
    width: 60px;
    height: 120px;
    background-color: #bbb;
    border-radius: 6px;
    left: 50%;
    padding: 2px;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  &__groove {
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.2),
      inset -1px -1px 4px rgba(0, 0, 0, 0.2),
      -1px -1px 4px rgba(255, 255, 255, 0.5);
    padding: 5px;
    height: 100%;
    width: 100%;
  }

  &__top {
    background-color: #eee;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05),
      inset 0 0 24px rgba(0, 0, 0, 0.025),
      inset -16px -16px 36px rgba(0, 0, 0, 0.1);
    height: 50%;
    left: 0;
    position: absolute;
    top: 0;
    transition: background 0.25s ease, box-shadow 0.25s ease;
    width: 100%;
    z-index: 2;

    &-outset {
      background-color: #fff;
      background-image: linear-gradient(90deg, #fff 0%, #f7f7f7 100%);
      height: 10px;
      transition: height 0.25s ease;
    }
  }

  &__bottom {
    background-color: #fff;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1),
      inset 0 0 12px rgba(0, 0, 0, 0.05);
    height: 50%;
    left: 0;
    position: absolute;
    top: 50%;
    transition: background 0.25s ease, box-shadow 0.25s ease;
    width: 100%;
    z-index: 2;

    &-outset {
      bottom: 0;
      background-color: #fff;
      background-image: linear-gradient(90deg, #e7e7e7 0%, #d7d7d7 100%);
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1),
        inset 0 0 12px rgba(0, 0, 0, 0.05);
      height: 0px;
      position: absolute;
      transition: height 0.25s ease;
      width: 100%;
    }
  }

  &__shadow-box {
    height: 104px;
    left: 52px;
    overflow: hidden;
    position: absolute;
    width: 50px;
    z-index: 1;

    &.top {
      top: -48px;
    }

    &.bottom {
      top: 5px;
    }
  }

  &__shadow {
    background-color: rgba(0, 0, 0, 0.33);
    height: 45px;
    position: absolute;
    transition: left 0.25s ease, filter 0.25s ease, opacity 0.25s ease,
      transform 0.25s ease;
    width: 45px;

    &.top {
      bottom: 10px;
      filter: blur(10px);
      left: -35px;
      opacity: 1;
      transform: rotate(20deg);
    }

    &.bottom {
      bottom: 0;
      left: -45px;
      filter: blur(0px);
      opacity: 0.5;
      transform: rotate(0deg);
    }
  }
}

.light-switch--checked {
  .panel {
    .switch {
      &__top {
        background-color: #fff;
        box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1),
          inset 0 0 12px rgba(0, 0, 0, 0.05);

        &-outset {
          height: 0;
        }
      }

      &__bottom {
        background-color: #eee;

        &-outset {
          height: 10px;
        }
      }

      &__shadow {
        &.top {
          left: -90px;
          filter: blur(0px);
          opacity: 0.5;
          transform: rotate(0deg);
        }

        &.bottom {
          left: -35px;
          filter: blur(10px);
          opacity: 1;
          transform: rotate(-20deg);
        }
      }
    }
  }
}
</style>
