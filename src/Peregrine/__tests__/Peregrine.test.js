import ReactDOM from 'react-dom';
import { createElement } from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    mockServiceWorker,
    unmockServiceWorker
} from './__helpers__/mockNavigator.js';

import Peregrine from '..';

jest.mock('react-dom');

configure({ adapter: new Adapter() });

let registerSW;
beforeAll(() => {
    for (const method of Object.keys(console)) {
        jest
            .spyOn(console, method)
            .mockImplementation(() => {})
            .mockName(`console.${method}`);
    }
    registerSW = mockServiceWorker().register;
});

afterAll(() => {
    for (const method of Object.values(console)) {
        method.mockRestore();
    }
    unmockServiceWorker();
});

test('Constructs a new Peregrine instance', () => {
    const received = new Peregrine();

    expect(received).toMatchObject(
        expect.objectContaining({
            store: expect.objectContaining({
                dispatch: expect.any(Function),
                getState: expect.any(Function)
            })
        })
    );
});

test('Renders a Peregrine instance', () => {
    const app = new Peregrine();
    const wrapper = shallow(app.render());
    expect(wrapper.find('MagentoRouter')).toHaveLength(1);
});

test('Mounts a Peregrine instance', () => {
    const container = document.createElement('div');
    const received = new Peregrine();

    received.mount(container);
    expect(ReactDOM.render).toHaveBeenCalledWith(expect.anything(), container);
});

test('Adds a reducer to the store', () => {
    const expected = {};
    const app = new Peregrine();
    const fooReducer = (state = null, { type }) =>
        type === 'bar' ? expected : state;

    app.addReducer('foo', fooReducer);
    const received = app.store.getState().foo;
    expect(received).toBe(null);

    app.store.dispatch({ type: 'bar' });
    const next = app.store.getState().foo;
    expect(next).toBe(expected);
});

test('Registers a service worker with name defaulting to sw.js', async () => {
    registerSW.mockImplementationOnce(() => Promise.resolve({ scope: '/' }));
    const hasScopeProp = (scope = '/') => expect.objectContaining({ scope });
    const app = new Peregrine();
    await expect(app.registerServiceWorker()).resolves.toEqual(hasScopeProp());
    expect(registerSW).toHaveBeenCalledTimes(1);
    expect(registerSW.mock.calls[0][0]).toEqual(
        expect.stringMatching(/\/[^\/]+\.js/)
    );
    expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('registered'),
        hasScopeProp()
    );
    jest.clearAllMocks();
    registerSW.mockImplementationOnce(() =>
        Promise.resolve({ scope: '/store/' })
    );
    await expect(
        app.registerServiceWorker('/custom-sw.js', { scope: '/store/' })
    ).resolves.toEqual(hasScopeProp('/store/'));
    expect(registerSW).toHaveBeenCalledTimes(1);
    expect(registerSW).toHaveBeenCalledWith(
        '/custom-sw.js',
        hasScopeProp('/store/')
    );
    expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('registered'),
        hasScopeProp('/store/')
    );
    jest.clearAllMocks();
});


test('Waits until load event to register serviceworker', async () => {
    jest.clearAllMocks();
    // we want to restore the current readyState, usually "complete"
    const currentReadyState = window.document.readyState;
    Object.defineProperty(window.document, 'readyState', {
        value: 'incomplete',
        writable: true
    });
    registerSW.mockImplementationOnce(() => Promise.resolve({ scope: '/' }));
    const app = new Peregrine();
    const waitingToRegister = app.registerServiceWorker();
    expect(registerSW).not.toHaveBeenCalled();
    window.dispatchEvent(new Event('load'));
    expect(registerSW).toHaveBeenCalled();
    await waitingToRegister;
    window.document.readyState = currentReadyState;
});

test('Fails registration when serviceworker registration fails', async () => {
    registerSW.mockImplementationOnce(() => Promise.reject(new Error('404')));
    const app = new Peregrine();
    await expect(app.registerServiceWorker()).rejects.toThrowError('404');
    jest.clearAllMocks();
});

test('Does not try to register a serviceWorker when unsupported', async () => {
    delete navigator.serviceWorker;
    const app = new Peregrine();
    await expect(app.registerServiceWorker()).rejects.toThrowError(
        'unsupported'
    );
    jest.clearAllMocks();
});
