// Имеется три колонки со списком иконок.
let data = [
  'bomb',
  'bluetooth',
  'book',
  'bullhorn',
  'camera-retro',
  'clock-o',
  'coffee',
  'cube',
  'diamond',
  'envelope',
  'eye',
  'flash',
  'heart',
  'hashtag',
  'info',
  'keyboard-o',
  'legal',
  'mortar-board',
  'phone',
  'registered',
  'cloud',

  'television',
  'anchor',
  'truck',
  'video-camera',
  'wifi',
  'car',
  'bell-o',
  'binoculars',
  'bug',
  'circle-o',
  'cog',
  'compass',
  'female',
  'flag',
  'flask',
  'lemon-o',
  'key',
  'motorcycle',
  'paper-plane',
  'plane',
  'soccer-ball-o',

  'balance-scale',
  'trophy',
  'bus',
  'check',
  'close',
  'copyright',
  'cutlery',
  'eyedropper',
  'headphones',
  'magnet',
  'male',
  'microphone',
  'money',
  'plug',
  'puzzle-piece',
  'shield',
  'tree',
  'unlock',
  'rocket',
  'paw',
  'music'
];

let defaultRows = [];

// Пустой двумерный массив для перебора в определенном порядке массива defaultRows[];
let temporatyArray1 = [
  [],
  [],
  []
];
// Пустой двумерный массив для перебора в определенном порядке массива temporatyArray[];
let temporatyArray2 = [
  [],
  [],
  []
];
// Пустой двумерный массив который хранит результативный набор чисел.
let resultArray = [
  [],
  [],
  []
];

// Общее хранилище рабочих двумерных массивов, предназначено для обращения к ним по индексу
let storeArrays = [defaultRows, temporatyArray1, temporatyArray2, resultArray];

// Необходимые переменные
let remainder = 0, // Счетчик для функции getRemainder();
    count2 = 0, // Счетчик для функции replaceNum(); Требуется обнуление
    getRow = 0, // В этой переменной хранится определенный ряд массива defaultRows[];
    count4 = 0, // Переменная для функции replaceNum();
    clickBtnRow = 0, // Считает нажатие по кнопке выбора ряда
    numberRow1 = 0, // Счетчики для перебора массива storeArrays[];
    numberRow2 = 1;

/*
Эта  функция обрабатывается в цикле и возвращает
последовательность чисел в таком порядке
1.(0,1,2,0,1,2,0),
2.(1,2,0,1,2,0,1),
3.(2,0,1,2,0,1,2);
*/
function getRemainder(num) {
  return num % 3;
}

/*
Перезаписывает свойство переменной count4:
1.(0,0,0,1,1,1,2),
2.(2,2,3,3,3,4,4),
3.(4,5,5,5,6,6,6);
*/
function replaceNum() {
  count4 = Math.floor(count2 / 3);
  count2 += 1;
}

/*0).ИНИЦИАЛИЗАЦИЯ
Подготовка данных. Формируем массив с тремя рандомными массивами 
*/
function init() {
  const randomNumbers = numRandom(0, 62);

  for (let i = 0; i < 3; i++) {
    defaultRows.push([]);
    for (let j = 0; j < 21; j++) {
      defaultRows[i].push(createUnit(data[randomNumbers[j]]));
    }
    randomNumbers.splice(0, 21);
  }
}

function createUnit(name) {
  return `<i class="fa fa-${name}"></i>`;
}

init();

/*1).РАССТАНОВЩИК
Выводим все свойства массива defaultRows[]; в DOM дерево, в рандомном порядке, в три колонки
*/
const rowsContainer = document.getElementById('rows');
const classRow = rowsContainer.getElementsByClassName('row');

function showNumbers(array) {
  const arr = numRandom(0, 20);

  for (let i = 0; i < 3; i++) {
    let ul = document.createElement('ul');

    for (let j = 0; j < array[i].length; j++) {
      let li = document.createElement('li');
      li.innerHTML = array[i][arr[j]];
      ul.appendChild(li);
    }

    classRow[i].appendChild(ul);
  }
}

// Функция генерирует заданное количество рандомных чисел
function numRandom(min, max) {
  const arr = []; // записываем в этот массив рандомные, не повторяющиеся числа
  let rundomNumber;

  while(arr.length <= max) {
    rundomNumber = Math.floor( Math.random() * (max - min + 1) ) + min; // создадим случайное число
    if (arr.indexOf(rundomNumber) == -1) { // проверим есть оно  у нас или нет
      arr.push(rundomNumber);
    }
  }

  return arr;
}

/*2).ОПРЕДЕЛИТЕЛЬ
Выбираем ряд в котором находится ваше загаданное число
*/
function rowIs(btn) {
  play('audio/clickRow.mp3');
  getRow = Number(btn.getAttribute('id')) + 2;
  count2 = 0; // Обнуляем переменную чтобы в функцие replaceNum счетчик count2 при запуске был равен нулю.
  shuffleTheRows(storeArrays[numberRow1], storeArrays[numberRow2]); // Перебрать ряды в соответствии со свойствами переменных numberRow.
  numberRow1 += 1;
  numberRow2 += 1;
  clear(); // После того как выбрали ряд удаляем все числа
}

// Очищает все числа в DOM дереве, для следующего вывода чисел
function clear() {
  const ull = rowsContainer.getElementsByTagName('ul');
  for (let i = 0; i < ull.length; i++) {
    ull[i].remove();
  }
}

/*3).РАСТАСОВЩИК
Перетасовывает числа из массива defaultRows[];
в массив temporatyArray[]; из которого
в результативный массив resultArray[];,
в определенном порядке.
*/
function shuffleTheRows(fullArray, emptyArray) {
  for (let i = 1; i <= 3; i++) {

    for (let j = 0; j < 21; j++) {
      replaceNum();
      emptyArray[getRemainder(remainder)][count4] = fullArray[getRemainder(getRow)][j];
      remainder += 1;
    }

    remainder = i;
    getRow += 1;
  }

  showNumbers(emptyArray); // Вывод на экран после перебора
}

/*4).РЕЗУЛЬТАТ
Вывод результата на экран
*/
rowsContainer.addEventListener('click', getResult);

let resNum;
let h4Num;

function getResult(e) {
  if (clickBtnRow == 3) {
    for (let i = 0; i < classRow.length; i++) {
      classRow[i].classList.add('displayNone');
    }

    clickBtnRow = 0;
    numberRow1 = 0;
    numberRow2 = 1;
    createNode(resNum, 'div', 'id', 'resultNumber', h4Num, 'h4', storeArrays[3][+e.target.getAttribute('id')][10], rowsContainer);
    pasteText(h2, sayPhrase[1]);
    play('audio/laugh.mp3');
    changeAttribute(lampImg2, 'removeAttribute', 'animated swing');
    return clickBtnRow = 0;
  }

  return clickBtnRow += 1;
}

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////Start_modal_window//////////////////////////
//////////////////////////////////////////////////////////////////////////
let sayPhrase = [
  "Жми на тот ряд где находится твоя выбранная иконка",
  "Ещё разок?",
  "Ну ты знаешь правила: как запомнил иконку, жми на лампочку"
];

let start_modal_window = document.getElementById('start_modal_window');
let btn_continue = document.getElementById('btn_continue');
let dontClick = document.getElementById('dontClick');

btn_continue.addEventListener('click', function(){
  changeCss(start_modal_window, 'left', '100%');
  showNumbers(defaultRows);
  changeAttribute(rowsContainer, 'setAttribute', 'displayFlex');
});

///////////////////////////////////////////////////////
////////////////////Главная область///////////////////
/////////////////////////////////////////////////////
let h2 = document.getElementById('h2');
let rightBlock = document.getElementById('right');
let arrowUp = document.getElementById('arrowUp');
let leftBlock = document.getElementById('left');
let lampImg1 = document.getElementById('img');
let lampImg2 = document.getElementById('img2');
let btnReady = document.getElementById('ready');
let btnRepeat = document.getElementById('repeat');

btnReady.addEventListener('click', function(){
  changeCss(rightBlock, 'backgroundImage', 'url(img/troll.png)');
  pasteText(h2, sayPhrase[0]);
  changeAttribute(h2, 'setAttribute', 'colorBlack');
  changeAttribute(lampImg1, 'setAttribute', 'displayNone');
  changeAttribute(lampImg2, 'setAttribute', 'displayBlock animated swing');
  changeAttribute(dontClick, 'setAttribute', 'displayNone');
  changeAttribute(btnReady, 'setAttribute', 'displayNone');
  changeAttribute(btnRepeat, 'setAttribute', 'displayBlock');
  play('audio/LightSwitch.mp3');
  changeAttribute(leftBlock, 'setAttribute', 'bgWhite');
}, false);

btnRepeat.addEventListener('click', function(){

  for (let i = 0; i < classRow.length; i++) {
    classRow[i].classList.remove('displayNone');
  }

  restart();
  showNumbers(defaultRows);
  delResult();
  pasteText(h2, sayPhrase[2]);
  play('audio/LightSwitch.mp3');
  changeAttribute(lampImg1, 'setAttribute', 'displayBlock animated swing');
  changeAttribute(lampImg2, 'setAttribute', 'displayNone');
  changeAttribute(leftBlock, 'setAttribute', 'bgBlack');
  changeAttribute(btnReady, 'setAttribute', 'displayBlock');
  changeAttribute(btnRepeat, 'setAttribute', 'displayNone');
  changeAttribute(h2, 'setAttribute', 'colorWhite');
  changeAttribute(dontClick, 'setAttribute', 'displayBlock');
});

////////////////////////////////////////////////////
/////////////////////ФУНКЦИИ////////////////////////
//////////////////////////////////////////////////

function changeCss(node, selector, property) {
  node.style[selector] = property;
}
function pasteText(node, text) {
  node.innerHTML = text;
}

function changeAttribute(node, act, className){
  node[act]('class', className);
}

function play(mp3){
  let audio = new Audio(mp3);
  audio.play();
}

function restart() {
  let allUl = rowsContainer.getElementsByTagName('UL');

  for (let i = 0; i < classRow.length; i++) {
    classRow[i].removeChild(allUl[0]);
  }

}

function delResult() {
  let resultNumber = document.getElementById('resultNumber');
  resultNumber.remove();
}

function rN(min, max) {
  let rundomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // создадим случайное число
  return rundomNumber;
}

// Cоздаёт один родительский элемент с одним дочерним элементом
function createNode(variable1, node1, classs, attribute, variable2, node2, text, DomNode) {
  variable1 = document.createElement(node1);
  variable1.setAttribute(classs, attribute);
  variable2 = document.createElement(node2);
  variable2.innerHTML = text;
  variable1.appendChild(variable2);
  DomNode.appendChild(variable1);
}
