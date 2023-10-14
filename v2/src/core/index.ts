import { ref, watch } from "vue";
import ICONS from "@/core/icons";

type TMatrix = string[][][];
type TMatrixCol = string[][];

enum EnumSteps {
  step0 = 0,
  step1 = 1,
  step2 = 2,
  stepFinal = 4,
}

const COLS_COUNT = 3;
const COL_ITEMS_COUNT = 21;
const INIT_MATRIX: TMatrix = [
  [[], [], []],
  [[], [], []],
  [[], [], []],
  [[], [], []],
];

const useMagic = () => {
  const cols = ref<TMatrixCol>([]);
  const selectedCol = ref<number>(0);
  const step = ref<EnumSteps>(EnumSteps.step0);
  const result = ref<string | null>(null);
  const storeArrays = ref<TMatrix>([...INIT_MATRIX]);

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

  function _getResult(arr: TMatrix, colNum: number) {
    return arr[3][colNum][10];
  }

  function _generateStartCols() {
    const randomNumbers = _numRandom(0, 62);
    const columns: TMatrixCol = [];

    for (let i = 0; i < COLS_COUNT; i++) {
      columns.push([]);
      for (let j = 0; j < COL_ITEMS_COUNT; j++) {
        columns[i].push(ICONS[randomNumbers[j]]);
      }
      randomNumbers.splice(0, COL_ITEMS_COUNT);
    }

    return columns;
  }

  function _shuffleCol(array: TMatrixCol) {
    const newArray = array.map((subArray) => {
      const shuffledSubArray = [...subArray];
      for (let i = shuffledSubArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSubArray[i], shuffledSubArray[j]] = [
          shuffledSubArray[j],
          shuffledSubArray[i],
        ];
      }
      return shuffledSubArray;
    });
    return newArray;
  }

  function _mixCols(fullArray: TMatrixCol, newArray: TMatrixCol) {
    let counter1 = 0;
    let counter2 = 0;
    for (let i = 1; i <= COLS_COUNT; i++) {
      for (let j = 0; j < COL_ITEMS_COUNT; j++) {
        newArray[counter1 % 3][Math.floor(counter2 / 3)] =
          fullArray[(selectedCol.value + 2) % 3][j];
        counter1 += 1;
        counter2 += 1;
      }
      counter1 = i;
      selectedCol.value += 1;
    }
    return newArray;
  }

  function setCol(colNum: number) {
    selectedCol.value = colNum;
    if (step.value <= EnumSteps.step2) {
      const mixedCols = _mixCols(
        storeArrays.value[step.value],
        storeArrays.value[step.value + 1]
      );
      cols.value = _shuffleCol(mixedCols);
    }
    step.value += 1;
  }

  function init() {
    const columns = _generateStartCols();
    cols.value = columns;
    storeArrays.value[0] = columns;
  }

  function reset() {
    selectedCol.value = 0;
    step.value = EnumSteps.step0;
    result.value = null;
    storeArrays.value = [...INIT_MATRIX];
    init();
  }

  watch(step, (s) => {
    if (s === EnumSteps.stepFinal) {
      result.value = _getResult(storeArrays.value, selectedCol.value);
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
