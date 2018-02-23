import { createElement, Component } from 'react';
import { func, number, any } from 'prop-types';
import { ScheduledPropUpdates } from './';

export default class DelayedProps extends Component {
    static propTypes = {
        initial: any,
        delay: number.isRequired,
        updated: any.isRequired,
        /* (prop: any) => React.Element<any> */
        children: func.isRequired
    };

    render() {
        let schedule = [
            {
                elapsed: this.props.delay,
                args: [this.props.updated]
            }
        ];
        if (this.props.hasOwnProperty('initial')) {
            schedule = [
                {
                    elapsed: 0,
                    args: [this.props.initial]
                }
            ].concat(schedule);
        }
        return (
            <ScheduledPropUpdates schedule={schedule}>
                {this.props.children}
            </ScheduledPropUpdates>
        );
    }
}
