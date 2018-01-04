import { createElement, Component } from 'react';
import { shape, func, string, object } from 'prop-types';

export default class RenderComponentForRoute extends Component {
    static propTypes = {
        route: shape({
            urlPattern: string.isRequired,
            getComponent: func.isRequired
        }).isRequired,
        /* () => React.Element<any> */
        renderLoading: func,
        /* (err: Error) => React.Element<any> */
        renderRouteError: func.isRequired,
        routeProps: shape({
            match: object.isRequired,
            location: object.isRequired,
            history: object.isRequired
        }).isRequired
    };

    state = {
        RouteComponent: null,
        routingError: null
    };

    async unwrapAndCacheRouteComponent() {
        const { route } = this.props;
        try {
            const RouteComponent = await route.getComponent();
            this.setState({ RouteComponent });
        } catch (err) {
            this.setState({ routingError: err });
        }
    }

    componentDidMount() {
        this.unwrapAndCacheRouteComponent();
    }

    render() {
        const { renderLoading, renderRouteError, routeProps } = this.props;
        const { RouteComponent, routingError } = this.state;

        if (routingError) {
            return renderRouteError(routingError);
        }

        if (!RouteComponent) {
            return renderLoading ? renderLoading() : null;
        }

        return <RouteComponent {...routeProps} />;
    }
}
