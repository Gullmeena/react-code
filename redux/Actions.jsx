import { PRODUCT_LIST, SEARCH_PRODUCT,SET_SEARCH_RESULTS } from "./constants";

export const productList = (data) => ({
    type: PRODUCT_LIST,
    data
});

export const productSearch = (query) => ({
    type: SEARCH_PRODUCT,
    payload: { query }
});
export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    payload: results
});