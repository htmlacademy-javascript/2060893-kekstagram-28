import {isEscapeKey} from './util.js';

const templateSuccessMessage = document.querySelector('#success')
  .content.querySelector('.success');
const successButton = templateSuccessMessage.querySelector('.success__button');
const templateErrorMessage = document.querySelector('#error')
  .content.querySelector('.error');
const errorButton = templateErrorMessage.querySelector('.error__button');
const body = document.querySelector('body');

const onModalEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalMessage();
  }
};

function closeModalMessage () {
  templateSuccessMessage.classList.add('hidden');
  templateErrorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
}

const showSuccessMessage = () => {
  body.append(templateSuccessMessage);
  templateSuccessMessage.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

const showErrorMessage = () => {
  body.append(templateErrorMessage);
  templateErrorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

successButton.addEventListener('click', closeModalMessage);
errorButton.addEventListener('click', closeModalMessage);
document.addEventListener('click', closeModalMessage);

export {showSuccessMessage, showErrorMessage};
