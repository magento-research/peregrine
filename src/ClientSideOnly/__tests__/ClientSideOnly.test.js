import ClientSideOnly from '..';
import { createElement } from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Returns value from invoking onServerRender prop in SSR mode', () => {
    jest.spyOn(ClientSideOnly, 'isSSR').mockImplementation(() => true);
    const wrapper = shallow(
        <ClientSideOnly onServerRender={() => <div>Server Content</div>}>
            Client Content
        </ClientSideOnly>
    );
    expect(wrapper.text()).toEqual('Server Content');
    ClientSideOnly.isSSR.mockReset();
});

test('Returns default value (null) when onServerRender is not provided', () => {
    jest.spyOn(ClientSideOnly, 'isSSR').mockImplementation(() => true);
    const wrapper = shallow(<ClientSideOnly>Client Content</ClientSideOnly>);
    expect(wrapper.text()).toEqual('');
    ClientSideOnly.isSSR.mockReset();
});

test('Returns children in non-SSR mode', () => {
    jest.spyOn(ClientSideOnly, 'isSSR').mockImplementation(() => false);
    const wrapper = shallow(
        <ClientSideOnly onServerRender={() => <div>Server Content</div>}>
            Client Content
        </ClientSideOnly>
    );
    expect(wrapper.text()).toEqual('Client Content');
    ClientSideOnly.isSSR.mockReset();
});
