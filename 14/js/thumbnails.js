// Модуль отрисовки миниатюр

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');

const thumbnailFragment = document.createDocumentFragment();

const createThumbnail = ({url, likes, comments, descriptions, id}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__img').alt = descriptions;
  thumbnailElement.dataset.thumbnailId = id;

  return thumbnailElement;
};

const renderThumbnails = (pictures) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnailFragment.append(thumbnail);
  });

  thumbnailContainer.append(thumbnailFragment);
};

export {renderThumbnails};
