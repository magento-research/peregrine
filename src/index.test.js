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
    const received = await new Peregrine(
        Promise.resolve(SimpleComponent)
    ).render();
    const expected = <SimpleComponent />;

    expect(render(received)).toEqual(render(expected));
});
