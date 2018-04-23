import { createElement, Component } from 'react';
import { func, node } from 'prop-types';

export default class ClientSideOnly extends Component {
    static propTypes = {
        onServerRender: func,
        children: node
    };

    static defaultProps = {
        onServerRender: () => null
    };

    static isSSR() {
        return process.env.NODE_ENV === 'server';
    }

    render() {
        return ClientSideOnly.isSSR()
            ? this.props.onServerRender()
            : this.props.children;
    }
}
