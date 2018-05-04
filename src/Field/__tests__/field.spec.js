import { createElement } from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Field from '../field';

configure({ adapter: new Adapter() });

test('renders a div', () => {
    const children = 'abc';
    const wrapper = shallow(<Field>{children}</Field>);

    expect(wrapper.type()).toEqual('div');
});

test('renders children and a message', () => {
    const props = { children: 'a', message: 'b' };
    const wrapper = shallow(<Field {...props} />);

    expect(wrapper.childAt(0).text()).toEqual(props.children);
    expect(wrapper.childAt(1).text()).toEqual(props.message);
});

test('renders an empty message element by default', () => {
    const props = { children: 'a' };
    const wrapper = shallow(<Field {...props} />);

    expect(wrapper.childAt(1).type()).toEqual('p');
});

test('renders a control', () => {
    const props = { type: 'text' };
    const wrapper = shallow(<Field {...props} />);

    expect(wrapper.childAt(0).type()).toEqual('label');
});

test('renders a control group', () => {
    const props = { options: [], type: 'radio' };
    const wrapper = shallow(<Field {...props} />);

    expect(wrapper.childAt(0).type()).toEqual('div');
});
