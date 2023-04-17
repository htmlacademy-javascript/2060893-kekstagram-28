// Модуль сортировки картинок по фильтрам

const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterBlock = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandom = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const onClickFilter = (cb) => {
  filterBlock.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickButton = evt.target;
    if (clickButton.id === currentFilter) {
      return;
    }

    filterBlock
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickButton.classList.add('img-filters__button--active');
    currentFilter = clickButton.id;
    cb(getFilteredPictures());
  });
};

const init = (data, cb) => {
  filterBlock.classList.remove('img-filters--inactive');
  pictures = [...data];
  onClickFilter(cb);
};

export {init, getFilteredPictures};
