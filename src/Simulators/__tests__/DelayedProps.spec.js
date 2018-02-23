jest.mock('../ScheduledPropUpdates');
import ScheduledPropUpdates from '../ScheduledPropUpdates';
import DelayedProps from '../DelayedProps';
import { createElement } from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('with no `initial` prop, renders ScheduledPropUpdates with delayed call', () => {
    const wrapper = shallow(
        <DelayedProps delay={1000} updated="woah">
            {cls => <div className={cls} />}
        </DelayedProps>
    );
    expect(wrapper.is(ScheduledPropUpdates)).toBeTruthy();
    expect(wrapper.prop('schedule')).toEqual([
        {
            elapsed: 1000,
            args: ['woah']
        }
    ]);
});

test('with `initial` prop, renders ScheduledPropUpdates with two calls', () => {
    const wrapper = shallow(
        <DelayedProps initial="immediate" delay={1000} updated="woah">
            {cls => <div className={cls} />}
        </DelayedProps>
    );
    expect(wrapper.is(ScheduledPropUpdates)).toBeTruthy();
    expect(wrapper.prop('schedule')).toEqual([
        { elapsed: 0, args: ['immediate'] },
        { elapsed: 1000, args: ['woah'] }
    ]);
});
