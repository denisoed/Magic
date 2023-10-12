import { ref, watch } from "vue";
import ICONS from "@/core/icons";

const COLS_COUNT = 3;
const COL_ITEMS_COUNT = 21;

const useMagic = () => {
  const cols = ref<string[][]>([]);
  const selectedCol = ref<number>(0);
  const step = ref<number>(0);
  const result = ref<string | null>(null);
  const storeArrays = ref<string[][][]>([
    [[], [], []],
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ]);

  function _numRandom(min: number, max: number) {
    const result: number[] = [];
    let rundomNumber: number;

    while (result.length <= max) {
      rundomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (result.indexOf(rundomNumber) === -1) {
        result.push(rundomNumber);
      }
    }

    return result;
  }

  function _generateStartCols() {
    const randomNumbers = _numRandom(0, 62);
    const columns: string[][] = [];

    for (let i = 0; i < COLS_COUNT; i++) {
      columns.push([]);
      for (let j = 0; j < COL_ITEMS_COUNT; j++) {
        columns[i].push(ICONS[randomNumbers[j]]);
      }
      randomNumbers.splice(0, COL_ITEMS_COUNT);
    }

    return columns;
  }

  function _mixCols(fullArray: string[][], emptyArray: string[][]) {
    let counter1 = 0;
    let counter2 = 0;
    for (let i = 1; i <= COLS_COUNT; i++) {
      for (let j = 0; j < COL_ITEMS_COUNT; j++) {
        emptyArray[counter1 % 3][Math.floor(counter2 / 3)] =
          fullArray[(selectedCol.value + 2) % 3][j];
        counter1 += 1;
        counter2 += 1;
      }
      counter1 = i;
      selectedCol.value += 1;
    }
    cols.value = emptyArray;
  }

  function setCol(colNum: number) {
    selectedCol.value = colNum;
    if (step.value <= 2) {
      _mixCols(
        storeArrays.value[step.value],
        storeArrays.value[step.value + 1]
      );
    }
    step.value += 1;
  }

  function reset() {
    selectedCol.value = 0;
    step.value = 0;
    result.value = null;
  }

  function init() {
    const columns = _generateStartCols();
    cols.value = columns;
    storeArrays.value[0] = columns;
  }

  watch(step, (val) => {
    if (val === 4) {
      result.value = storeArrays.value[3][selectedCol.value][10];
    }
  });

  return {
    cols,
    result,
    init,
    reset,
    setCol,
  };
};

export default useMagic;
