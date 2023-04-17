const ALERT_SHOW_TIME = 5000;

// Функция проверки нажатой клавиши
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция отображения ошибки при отправке формы
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscapeKey, showAlert};
