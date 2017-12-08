// store reducers as a pseudo-private slice of state
const __reducers = Symbol('reducers');

const initialState = {
    [__reducers]: {}
};

// define the single root reducer
const rootReducer = (state = initialState, action = {}) => {
    const { payload, type } = action;
    const nextReducers = Object.assign({}, state[__reducers]);

    if (type === 'ADD_REDUCER') {
        const { key, reducer } = payload || {};

        Object.assign(nextReducers, { [key]: reducer });
    }

    if (type === 'ADD_REDUCERS') {
        payload.forEach(({ key, reducer }) =>
            Object.assign(nextReducers, {
                [key]: reducer
            })
        );
    }

    const slices = Object.entries(nextReducers).reduce(
        (memo, [key, reducer]) =>
            Object.assign(memo, { [key]: reducer(state[key], action) }),
        {}
    );

    return Object.assign({}, state, slices, {
        [__reducers]: nextReducers
    });
};

export default rootReducer;
