import { createElement } from 'react';
import { RawHtml } from '..';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Renders raw HTML in a wrapper element', () => {
    const wrapper = mount(
        <RawHtml sanitizedRawHtml="<h1 id='o-no'>Raw!!!</h1>" />
    );
    expect(wrapper.html()).toEqual(
        '<span class="peregrine-raw-html"><h1 id="o-no">Raw!!!</h1></span>'
    );
});

test('Takes a prop for a custom wrapper element', () => {
    const wrapper = mount(
        <RawHtml
            sanitizedRawHtml="<h1 id='o-no'>Raw!!!</h1>"
            wrapperTag="article"
        />
    );
    expect(wrapper.html()).toEqual(
        '<article class="peregrine-raw-html"><h1 id="o-no">Raw!!!</h1></article>'
    );
});

test('Takes DOM properties for the custom wrapper element', () => {
    const wrapper = mount(
        <RawHtml
            sanitizedRawHtml="<h1 id='o-no'>Raw!!!</h1>"
            wrapperTag="article"
            className="custom-class-name"
            style={{ background: 'blue' }}
        />
    );
    expect(wrapper.html()).toEqual(
        '<article class="custom-class-name" style="background: blue;"><h1 id="o-no">Raw!!!</h1></article>'
    );
});
