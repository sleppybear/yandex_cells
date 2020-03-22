console.clear();
const createArr = (n, m) => { //создание случайного массива заданного размера
  if(n < 1 | m < 1) return undefined;
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push([]);
    for (let j = 0; j < m; j++) {
      arr[i].push(Math.round(Math.random()));
    }
  }
  return arr;
}
const liveCount = (arr, i, j) => { //количество живых соседей для конкретной ячейки
  let neighbors = 0 - arr[i][j];
  for (let n = i - 1; n <= i + 1; n++) {
    for (let m = j - 1; m <= j + 1; m++) {
      if (n >= 0 & n < arr.length & m >= 0 & m < arr[i].length) {
        if (arr[n][m] == 1) neighbors += 1;
      }
    }
  }
  return neighbors;
}
const updateArr = (arr) => { //возвращает массив с новыми значениями ячеек
  let newArr = [];
  let neighbors;
  for (let i = 0; i < arr.length; i++) {
    newArr.push([]);
    neighbors = 0;
    for (let j = 0; j < arr[i].length; j++) {
      neighbors = liveCount(arr, i, j);
      if (arr[i][j] == 1) {
        if (neighbors < 2 | neighbors > 3) newArr[i].push(0);
        else newArr[i].push(1);
      }
      else if (neighbors == 3) newArr[i].push(1);
      else newArr[i].push(arr[i][j]);
    }
  }
  return newArr;
}
const liveCells = (arr) => { //возвращает общее количество живых ячеек в массиве
  count = 0;
  for (let i = 0; i < arr.length; i++) {
    count += arr[i].filter(function(elem){return elem > 0}).length;
  }
  return count;
}
const output = (arr) => { //вывод обновлённых массивов раз в секунду
  let timer = setTimeout(function() {
    let newArr = updateArr(arr);
    if (equivalent(arr, newArr)) {
      console.log("End: the array will not change.");
    }
    else {
	  console.log(newArr);
	  output(newArr);
	}
  }, 1000);
}
const equivalent = (arr1, arr2) => { //true если массивы эквивалентны (для двухмерных одного рамера)
  for (let i = 0; i < arr1.length; i++) {
    if (!arr1[i].every((elem, ind) => elem === arr2[i][ind])) return false;
  }
  return true;
}
/*let testArr = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0]
]*/
let arr = createArr(3, 3);
console.log(arr);
output(arr);
var div