import { createElement, Component } from 'react';
import { arrayOf, oneOfType, shape, func, number, any } from 'prop-types';
import scheduleCallbackArgs from './schedule-callback-args';

export default class ScheduledPropUpdates extends Component {
    static propTypes = {
        schedule: arrayOf(
            shape({
                elapsed: number.isRequired,
                args: oneOfType([arrayOf(any), func]).isRequired
            })
        ),
        /* (prop: any) => React.Element<any> */
        children: func.isRequired
    };

    componentWillMount() {
        this._pending = scheduleCallbackArgs(this.props.schedule, (...args) =>
            this.setState({ args })
        );
    }

    componentWillUnmount() {
        this._pending.cancel();
    }

    render() {
        return this.props.children(...this.state.args);
    }
}
