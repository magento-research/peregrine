import { Component, createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createStore from './store';

const Shadow = ({ children }) => children;

class Peregrine extends Component {
    constructor(props) {
        super(props);

        this.store = createStore();
    }

    static mount() {
        render(...arguments);
    }

    render() {
        const { props, store } = this;
        const child = createElement(Shadow, null, props.children);
        const router = createElement(BrowserRouter, null, child);

        return createElement(Provider, { store }, router);
    }
}

export default Peregrine;
