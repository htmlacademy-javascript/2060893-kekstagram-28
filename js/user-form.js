// Модуль работы формы
import {DataForForm, SubmitButtonText} from './data.js';
import {resetEffects} from './effects.js';
import {resetScale} from './scale.js';
import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadStart = form.querySelector('#upload-file');
const uploadCancel = form.querySelector('#upload-cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const submitButton = form.querySelector('.img-upload__submit');
const imgUploadPreview = form.querySelector('.img-upload__preview img');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
let tagsList = [];

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  erorTextClass: 'img-upload__field-wrapper__error',
});

function validateHashtag (value) {
  tagsList = value.trim().split(' ').filter((tag) => tag.trim().length);
  return tagsList;
}

const isValidHashtag = (value) => DataForForm.VALID_SYMBOLS.test(value);

const isUniqHashtags = (value) => {
  const lowerCaseHashtags = value.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const checkingForQuantityHashtags = (value) => value.length <= DataForForm.MAX_HASHTAG_QUANTITY;

const validateUniqueHashtags = (value) => {
  validateHashtag(value,tagsList);
  return isUniqHashtags(tagsList);
};

const validateQuantityHashtags = (value) => {
  validateHashtag(value,tagsList);
  return checkingForQuantityHashtags(tagsList);
};

const validateValidHashtags = (value) => {
  validateHashtag(value,tagsList);
  return tagsList.every(isValidHashtag);
};

pristine.addValidator(
  hashtagField,
  validateQuantityHashtags,
  DataForForm.ERROR_MESSAGE_HASHTAG_QUANTITY,
);

pristine.addValidator(
  hashtagField,
  validateUniqueHashtags,
  DataForForm.ERROR_MESSAGE_UNIQUE_HASHTAG,
);

pristine.addValidator(
  hashtagField,
  validateValidHashtags,
  DataForForm.ERROR_MESSAGE_VALID_HASHTAG,
);

const isFieldFocus = () =>
  document.activeElement === commentField || document.activeElement === hashtagField;

const modalOpen = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  const file = uploadStart.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
};

const modalClose = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown (evt) {
  if(isEscapeKey(evt) && !isFieldFocus()) {
    evt.preventDefault();
    modalClose(evt);
  }
}

const onUploadFileChange = () => {
  modalOpen();
};

const onCancelButtonClick = () => {
  modalClose();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const submitForm = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

uploadStart.addEventListener('change', onUploadFileChange);
uploadCancel.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', submitForm);

export {submitForm, modalClose};
