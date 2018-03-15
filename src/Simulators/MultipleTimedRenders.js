import { createElement, Component } from 'react';
import { arrayOf, oneOfType, shape, func, number, any } from 'prop-types';
import SimulatorErrorBoundary from './SimulatorErrorBoundary';
import scheduleCallbackArgs from './schedule-callback-args';

export default class MultipleTimedRenders extends Component {
    static propTypes = {
        initialArgs: oneOfType([arrayOf(any), func]),
        scheduledArgs: arrayOf(
            shape({
                elapsed: number.isRequired,
                args: oneOfType([arrayOf(any), func]).isRequired
            }).isRequired
        ).isRequired,
        /* (error: Error) => any */
        onError: func,
        /* (prop: any) => React.Element<any> */
        children: func.isRequired
    };

    constructor(props) {
        super(props);
        const { initialArgs } = props;
        this.state = {
            args:
                typeof initialArgs === 'function' ? initialArgs() : initialArgs
        };
    }

    componentDidMount() {
        this._pending = scheduleCallbackArgs(
            this.props.scheduledArgs,
            (...args) => this.setState({ args }),
            e => {
                const decorated = new Error(
                    `Could not retrieve arguments: ${e.message}`
                );
                if (this.props.onError) {
                    this.props.onError(decorated);
                } else {
                    throw decorated;
                }
            }
        );
    }

    componentWillUnmount() {
        this._pending.cancel();
    }

    render() {
        return this.state.args ? (
            <SimulatorErrorBoundary
                what={this.constructor.name}
                when="after receiving props"
                handler={this.props.onError}
            >
                {this.props.children(...this.state.args)}
            </SimulatorErrorBoundary>
        ) : null;
    }
}
