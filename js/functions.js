// Функция для проверки длины строки
const getString = (string, length) => string.length >= length;

getString('проверяемая строка', 18);

// Функция для проверки строки на палиндром

const isPalindrom = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return tempString === reverseString;
};

isPalindrom ('Лёша на полке клопа нашёл');

// Функция, которая извлекает из строки цифры от 0 до 9 и возвращает их в виде целого числа

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }

  return parseInt(result, 10);
};

extractNumber('агент 007');


// Функция, которая принимает три параметра и возвращает исходную строку, дополненную указанными символами до заданной длины

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;

  if (actualPad <= 0) {
    return string;
  }

  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

myPadStart('qwerty', 4, '0');
