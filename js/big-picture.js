import {isEscapeKey} from './util.js';

const COMMENTS_ON_PART = 5;

const bigPicture = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');

let commentsShown = 0;

const createComment = ({avatar, name, message}) => {
  const commentElement = commentItem.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  commentsShown += COMMENTS_ON_PART;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  const onCommentsLoaderButton = () => {
    renderComments((comments).slice(commentsShown, commentsShown + COMMENTS_ON_PART));
    commentsShown += COMMENTS_ON_PART;
    if (commentsShown >= comments.length) {
      commentsShown = comments.length;
      commentsLoader.classList.add('hidden');
    }
  };

  commentsLoader.addEventListener('click', onCommentsLoaderButton);

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

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

const onCancelButtonClick = () => {
  closeBigPicture();
};

const renderPictureDetails = ({url, likes, descriptions}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = descriptions;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = descriptions;
};

const showBigPicture = (index) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(index);
  renderComments(index.comments);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
