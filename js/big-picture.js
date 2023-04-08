import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');

const createComment = ({avatar, name, message}) => {
  const commentElement = commentItem.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentText = createComment(comment);
    fragment.append(commentText);
  });

  commentList.innerHTML = '';
  commentList.append(fragment);
};

const openBigPicture = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img img').src = evt.target.src;
  }
  document.addEventListener('keydown', onDocumentKeydown);
};

bigPicture.addEventListener('click', openBigPicture);

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const renderPictureDetails = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (index) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(index);
  renderComments(index.comments);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
