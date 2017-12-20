import { createElement } from 'react';
import { connect } from 'react-redux';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Peregrine from './index.js';

configure({ adapter: new Adapter() });

const SimpleComponent = () => <i />;

test('constructs a new Peregrine instance', () => {
    const received = new Peregrine(Promise.resolve(SimpleComponent));

    expect(received).toMatchObject(
        expect.objectContaining({
            component: expect.any(Promise),
            store: expect.objectContaining({
                dispatch: expect.any(Function),
                getState: expect.any(Function)
            })
        })
    );
});

test('renders a Peregrine instance', async () => {
    const app = new Peregrine(Promise.resolve(SimpleComponent));
    const received = await app.render();
    const expected = <SimpleComponent />;

    expect(render(received)).toEqual(render(expected));
});

test('mounts a Peregrine instance', async () => {
    const container = document.createElement('div');
    const received = new Peregrine(Promise.resolve(SimpleComponent));
    const expected = <SimpleComponent />;

    await received.mount(container);

    expect(received.container).toEqual(container);
    expect(render(received.element)).toEqual(render(expected));
    expect(container.firstChild.outerHTML).toEqual(render(expected).toString());
});

test('adds a reducer to the store', async () => {
    const expected = {};
    const app = new Peregrine(Promise.resolve(SimpleComponent));
    const fooReducer = (state = null, { type }) =>
        type === 'bar' ? expected : state;

    await app.addReducer('foo', fooReducer);
    const received = app.store.getState().foo;
    expect(received).toBe(null);

    app.store.dispatch({ type: 'bar' });
    const next = app.store.getState().foo;
    expect(next).toBe(expected);
});
