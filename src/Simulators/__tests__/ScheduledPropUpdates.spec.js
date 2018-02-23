import ScheduledPropUpdates from '../ScheduledPropUpdates';
import { createElement } from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.useFakeTimers();

test('renders children on schedule', () => {
    const renderCallback = jest.fn(cls => <div className={cls} />);
    const wrapper = shallow(
        <ScheduledPropUpdates
            schedule={[
                { elapsed: 0, args: ['immediate'] },
                { elapsed: 900, args: () => ['after900', 'arg2'] }
            ]}
        >
            {renderCallback}
        </ScheduledPropUpdates>
    );
    expect(wrapper.contains(<div className="immediate" />)).toBeTruthy();
    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(renderCallback).toHaveBeenCalledWith('immediate');
    jest.advanceTimersByTime(800);
    expect(wrapper.contains(<div className="immediate" />)).toBeTruthy();
    expect(renderCallback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200);
    expect(renderCallback).toHaveBeenCalledTimes(2);
    expect(renderCallback).toHaveBeenLastCalledWith('after900', 'arg2');
    expect(wrapper.contains(<div className="after900" />));
});

test('does not execute pending delays if unmounted', () => {
    const renderCallback = jest.fn(cls => <div className={cls} />);
    const wrapper = shallow(
        <ScheduledPropUpdates
            schedule={[
                { elapsed: 0, args: ['immediate'] },
                { elapsed: 900, args: ['delayed'] }
            ]}
        >
            {renderCallback}
        </ScheduledPropUpdates>
    );
    expect(wrapper.contains(<div className="immediate" />)).toBeTruthy();
    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(renderCallback).toHaveBeenCalledWith('immediate');
    wrapper.unmount();
    jest
        .spyOn(console, 'error')
        .mockName('console.error')
        .mockImplementation(() => {});
    expect(() => jest.runAllTimers()).not.toThrowError();
    expect(console.error).not.toHaveBeenCalled();
    expect(wrapper.contains(<div className="immediate" />)).toBeTruthy();
    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(renderCallback).toHaveBeenCalledWith('immediate');
});
