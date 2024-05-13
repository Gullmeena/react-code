import {PRODUCT_LIST,SET_SEARCH_RESULTS } from "./constants";

export const productData = (state = [], action) => {
    switch (action.type) {
        case PRODUCT_LIST:
            console.warn("PRODUCT_LIST condition ", action);
            return [...action.data];
        default:
            return state;
    }
};
export const searchResults = (state = [], action) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            return action.payload;
        default:
            return state;
    }
};
