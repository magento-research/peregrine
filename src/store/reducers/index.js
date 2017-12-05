const __reducers = Symbol('reducers');

const initialState = {
    [__reducers]: new Map()
};

const rootReducer = (state = initialState, action = {}) => {
    const reducers = state[__reducers];
    const { payload, type } = action;
    const nextState = Object.assign({}, state);

    if (type === 'ADD_REDUCER') {
        reducers.set(payload.key, payload.reducer);
    }

    if (type === 'ADD_REDUCERS') {
        payload.forEach(({ key, reducer }) => reducers.set(key, reducer));
    }

    for (const [key, reducer] of reducers) {
        nextState[key] = reducer(state[key], action);
    }

    return nextState;
};

export default rootReducer;
