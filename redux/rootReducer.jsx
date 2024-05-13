import { combineReducers } from 'redux';
import { productData, searchResults } from './reducers';

export default combineReducers({
    productData,
    searchResults
});
