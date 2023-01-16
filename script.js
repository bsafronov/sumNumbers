const btn = document.querySelector(".accept");
const arrayInput = document.querySelector(".array__input");
const valueInput = document.querySelector(".value__input");
const resultDiv = document.querySelector(".result");

btn.addEventListener("click", search);

const operations = ["-", "+", ""];

let variationsCount;
let currentVariation;
let arrayOperations = [];
let arrayNumbers = [];

function initArray() {
  arrayNumbers = [];
  arrayOperations = [];
  currentVariation = 0;

  for (let i = arrayInput.value - 1; i >= 0; i--) {
    arrayNumbers.push(i);
  }
  console.log(arrayNumbers);
  for (let i = 0; i < arrayNumbers.length - 1; i++) {
    arrayOperations.push(0);
  }

  variationsCount = operations.length ** (arrayNumbers.length - 1);
}

function search() {
  if (!arrayInput.value || !valueInput) return;

  resultDiv.innerHTML = "Мне не удалось найти комбинацию";

  initArray();

  console.log(arrayNumbers, arrayOperations);

  while (currentVariation < variationsCount) {
    const isFit = checkSum();

    if (isFit) {
      break;
    }

    const el = arrayOperations[0];

    if (el === 2) {
      arrayOperations[0] = 0;
      transitNumbers();
    } else {
      arrayOperations[0] += 1;
    }

    currentVariation += 1;
  }
}

function transitNumbers(number = 1) {
  for (let i = number; i < arrayOperations.length; i++) {
    const current = arrayOperations[i];

    if (current === 2) {
      arrayOperations[i] = 0;
      transitNumbers(i + 1);
    } else {
      arrayOperations[i] += 1;
      break;
    }
  }
}

function checkSum() {
  let resultString = `${arrayNumbers[0]}`;

  for (let i = 1; i < arrayNumbers.length; i++) {
    switch (arrayOperations[i - 1]) {
      case 0:
        resultString += "-" + arrayNumbers[i];
        break;
      case 1:
        resultString += "+" + arrayNumbers[i];
        break;
      case 2:
        resultString += arrayNumbers[i];
        break;
    }
  }
  console.log(arrayOperations);
  console.log(currentVariation, resultString);

  result = toInt(resultString);

  if (result.sum === Number(valueInput.value)) {
    const text =
      resultString +
      "=" +
      result.sum +
      "<br>" +
      "Ход работы можно увидеть в консоли";
    resultDiv.innerHTML = text;
    console.log(resultString + "=" + result.sum);
    return true;
  } else {
    return false;
  }
}

function toInt(string) {
  const numbers = string.split(/[+-]/).map(item => parseInt(item));
  const newArrayOperations = [...arrayOperations].filter(value => value !== 2);
  let sum = numbers[0];

  for (let i = 0; i < newArrayOperations.length; i++) {
    const operation = newArrayOperations[i];

    if (operation === 2) continue;

    if (operation === 1) {
      sum += numbers[i + 1];
    }

    if (operation === 0) {
      sum -= numbers[i + 1];
    }
  }

  return { sum, numbers, newArrayOperations };
}
