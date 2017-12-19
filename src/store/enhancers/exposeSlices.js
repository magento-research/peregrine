import { combineReducers } from 'redux';

const exposeSlices = createStore => (...args) => {
    const store = createStore(...args);
    const slices = {};

    const addReducer = (key, reducer) => {
        slices[key] = reducer;

        store.replaceReducer(combineReducers(slices));
    };

    return {
        ...store,
        addReducer
    };
};

export default exposeSlices;
