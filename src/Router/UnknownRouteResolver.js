import { createElement, Component } from 'react';
import { func, arrayOf, shape, string } from 'prop-types';
import resolveUnknownRoute from './resolveUnknownRoute';
import fetchRootComponent from './fetchRootComponent';

export default class UnknownRouteResolver extends Component {
    static propTypes = {
        routes: arrayOf(
            shape({
                urlPattern: string.isRequired,
                getComponent: func.isRequired
            })
        ).isRequired,
        pathname: string.isRequired,
        /* (route: object) => void */
        registerRoute: func.isRequired,
        /* () => React.Element<any> */
        render404: func.isRequired,
        /* (err: Error) => React.Element<any> */
        renderRouteError: func.isRequired,
        apiBase: string.isRequired,
        __tmp_webpack_public_path__: string.isRequired
    };

    componentDidMount() {
        this.handleRoute(this.props.pathname);
    }

    handleRoute(url) {
        const {
            renderRouteError,
            registerRoute,
            apiBase,
            __tmp_webpack_public_path__
        } = this.props;
        resolveUnknownRoute({
            route: url,
            apiBase,
            __tmp_webpack_public_path__
        })
            .then(({ rootChunkID, rootModuleID }) => {
                registerRoute({
                    getComponent: fetchRootComponent.bind(
                        null,
                        rootChunkID,
                        rootModuleID
                    ),
                    urlPattern: url
                });
            })
            .catch(err => {
                registerRoute({
                    getComponent: () => () => renderRouteError(err),
                    urlPattern: url
                });
            });
    }

    render() {
        return null;
    }
}
