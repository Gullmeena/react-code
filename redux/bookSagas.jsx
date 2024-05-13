import { takeEvery, put } from 'redux-saga/effects';
import { PRODUCT_LIST, SEARCH_PRODUCT } from './constants';
function* searchProducts(action) {
  try {
    const response = yield fetch(`https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${action.payload.query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const xmlData = yield response.text(); 
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    const bookNodes = xmlDoc.querySelectorAll('work > best_book');
    const books = Array.from(bookNodes).map(bookNode => {
      const id = bookNode.querySelector('id')?.textContent || 'Unknown Id';
      const title = bookNode.querySelector('title')?.textContent || 'Unknown Title';
      const author = bookNode.querySelector('author > name')?.textContent || 'Unknown Author';
      const image = bookNode.querySelector('image_url')?.textContent || 'No Image';
      const averageRating = bookNode.querySelector('average_rating')?.textContent || 'Unknown Rating';

      return {
        id,
        title,
        author,
        image,
        averageRating
      };
    });

    console.warn("action is called", books);
    yield put({ type: PRODUCT_LIST, data: books });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
function* productSaga() {
  yield takeEvery(SEARCH_PRODUCT, searchProducts);
}

export default productSaga;
