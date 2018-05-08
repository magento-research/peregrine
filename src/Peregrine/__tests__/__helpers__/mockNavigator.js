const defaultServiceWorker = () => ({
    register: jest.fn().mockName('navigator.serviceWorker.register')
});
const defineSwOn = (obj, value) =>
    obj &&
    obj.navigator &&
    Object.defineProperty(obj.navigator, 'serviceWorker', {
        value,
        configurable: true
    });
const removeSwFrom = obj => {
    if (obj && obj.navigator) {
        delete obj.navigator.serviceWorker;
    }
};

export const mockServiceWorker = (mock = defaultServiceWorker()) => {
    defineSwOn(global, mock);
    defineSwOn(global.window, mock);
    return mock;
};

export const unmockServiceWorker = () => {
    removeSwFrom(global);
    removeSwFrom(global.window);
};
