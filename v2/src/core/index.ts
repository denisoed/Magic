import { ref } from "vue";
import ICONS from "@/core/icons";

const useMagic = () => {
  const cols = ref<string[][]>([]);

  /**
   * Функция генерирует заданное количество рандомных чисел и возвращает массив
   */
  function _numRandom(min: number, max: number) {
    const result: number[] = []; // записываем в этот массив рандомные, не повторяющиеся числа
    let rundomNumber: number;

    while (result.length <= max) {
      rundomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // создадим случайное число
      // проверим есть ли такое число в массиве
      if (result.indexOf(rundomNumber) === -1) {
        result.push(rundomNumber);
      }
    }

    return result;
  }

  /**
   *
   */
  function init() {
    const randomNumbers = _numRandom(0, 62);

    for (let i = 0; i < 3; i++) {
      cols.value.push([]);
      for (let j = 0; j < 21; j++) {
        cols.value[i].push(ICONS[randomNumbers[j]]);
      }
      randomNumbers.splice(0, 21);
    }
  }

  return {
    init,
    cols,
  };
};

export default useMagic;
