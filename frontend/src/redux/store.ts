import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from './root';
import { useDispatch } from 'react-redux';

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => {
    return useDispatch<AppDispatch>();
};

export default store;