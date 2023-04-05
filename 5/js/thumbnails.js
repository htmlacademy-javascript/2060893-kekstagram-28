// Модуль отрисовки миниатюр

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');

const thumbnailFragment = document.createDocumentFragment();

const createThumbnail = ({url, likes, comments, description}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);

  thumbnailElement.querySelector('picture__img').src = url;
  thumbnailElement.querySelector('picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments;
  thumbnailElement.querySelector('picture__img').alt = description;

  return thumbnailElement;
};

const renderThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnailFragment.append(thumbnail);
  });

  thumbnailContainer.append(thumbnailFragment);
};

export {renderThumbnails};
