import { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createStore from './store';

const renderAsync = (element, container) =>
    new Promise(resolve => render(element, container, resolve));

class Peregrine {
    constructor(component) {
        this.component = component;
        this.store = createStore();
    }

    async render() {
        const { component, store } = this;
        const Component = await component;

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        );
    }

    async mount(container) {
        this.container = container;
        this.element = await this.render();

        await renderAsync(this.element, container);
    }

    async addReducer(key, _reducer) {
        const reducer = await _reducer;

        this.store.dispatch({
            type: 'ADD_REDUCER',
            payload: { key, reducer }
        });
    }
}

export default Peregrine;
