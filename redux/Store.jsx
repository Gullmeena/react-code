import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import productSaga from './bookSagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});
sagaMiddleware.run(productSaga);

export default store;
