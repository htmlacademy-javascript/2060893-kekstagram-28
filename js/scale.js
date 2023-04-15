// Модуль редактирования изображения

// Данные для редактирования изображения
const DataForScale = {
  standartValue: 100,
  step: 25,
  maxValue: 100,
  minValue: 25,
};

const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleSmallerButton = scaleFieldset.querySelector('.scale__control--smaller');
const scaleBiggerButton = scaleFieldset.querySelector('.scale__control--bigger');
const scaleValue = scaleFieldset.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const onClickSmallerButton = () => {
  const newValue = parseInt (scaleValue.value, 10);
  const calcSmaller = newValue - DataForScale.step;
  scaleValue.value = calcSmaller;
  if (scaleValue.value < DataForScale.minValue) {
    scaleValue.value = DataForScale.minValue;
  }
  scaleImage(scaleValue.value);
};

const onClickBiggerButton = () => {
  const newValue = parseInt (scaleValue.value, 10);
  const calcBigger = newValue + DataForScale.step;
  scaleValue.value = calcBigger;
  if(scaleValue.value > DataForScale.maxValue) {
    scaleValue.value = DataForScale.maxValue;
  }
  scaleImage(scaleValue.value);
};

scaleSmallerButton.addEventListener('click', onClickSmallerButton);
scaleBiggerButton.addEventListener('click', onClickBiggerButton);

const resetScale = () => scaleImage(DataForScale.defaultValue);

export {resetScale};
