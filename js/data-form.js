// Модуль данных для формы

const DataForForm = {
  MAX_HASHTAG_QUANTITY: 5,
  VALID_SYMBOLS: /^#[a-zа-яё0-9]{1,19}$/i,
  ERROR_MESSAGE_VALID_HASHTAG: 'Хэштэг должен начинаться с # (решётка). Хэштэг не может состоять только из одной решётки и иметь длину более 20 символов, а также иметь спецсимволы в названии (#, @, $ и т.п.)',
  ERROR_MESSAGE_HASHTAG_QUANTITY:'Должно быть не более 5 хэштэгов',
  ERROR_MESSAGE_UNIQUE_HASHTAG: 'Хэштэги должны быть уникальными',
};

const submitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

// Данные для редактирования изображения

const dataForScale = {
  standartValue: 100,
  step: 25,
  maxValue: 100,
  minValue: 25,
};

export { DataForForm, dataForScale, submitButtonText };
