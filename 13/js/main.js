import {getData, sendData} from './api.js';
import {renderGallery} from './gallery.js';
import {showAlert, debounce} from './util.js';
import {submitForm, modalClose} from './user-form.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {init, getFilteredPictures} from './filters.js';

submitForm (async (data) => {
  try {
    await sendData(data);
    modalClose();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  init(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}
