import { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createStore from './store';

/**
 * Mount a React tree.
 * A render callback fulfills the returned promise.
 * 
 * @async
 * @param {ReactElement} element The React component instance.
 * @param {Element} container The target DOM element.
 * @returns {Promise<void>}
 */
const renderAsync = (element, container) =>
    new Promise(resolve => render(element, container, resolve));

/**
 * @class
 * @prop {Promise<Component>} component
 * @prop {Element} container
 * @prop {ReactElement} element
 * @prop {Store} store
 */
class Peregrine {
    /**
     * Create a Peregrine instance.
     *
     * @param {Promise<Component>} component The root component.
     */
    constructor(component) {
        this.component = component;
        this.store = createStore();
    }

    /**
     * Create an instance of the root component, wrapped with store and routing
     * components.
     *
     * @async
     * @returns {Promise<ReactElement>}
     */
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

    /**
     * Render and mount the React tree into a DOM element.
     *
     * @async
     * @param {Element} container The target DOM element.
     * @returns {Promise<void>}
     */
    async mount(container) {
        this.container = container;
        this.element = await this.render();

        await renderAsync(this.element, container);
    }

    /**
     * Add a reducer (slice) to the store (root).
     * The store replaces the root reducer with one containing the new slice.
     *
     * @async
     * @param {string} key The name of the slice.
     * @param {Promise<function>} reducer The reducing function.
     * @returns {Promise<void>}
     */
    async addReducer(key, reducer) {
        this.store.addReducer(key, await reducer);
    }
}

export default Peregrine;
