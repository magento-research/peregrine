import scheduleCallbackArgs from '../schedule-callback-args';
jest.useFakeTimers();

beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});

jest.spyOn(console, 'error').mockImplementation(() => {});

test('errors if no schedule or no callback', () => {
    const errorText =
        'First argument must be an array of 1 or more { elapsed: number, args: any[] } objects, and second argument must be a callback function.';
    expect(() => scheduleCallbackArgs()).toThrow(errorText);
    expect(() => scheduleCallbackArgs([])).toThrow(errorText);
    expect(() => scheduleCallbackArgs([{ elapsed: 0, args: [] }])).toThrow(
        errorText
    );
    expect(() => scheduleCallbackArgs([{ elapsed: 0, args: [] }], {})).toThrow(
        errorText
    );
    expect(() => scheduleCallbackArgs(null, () => {})).toThrow(errorText);
});

test('invokes callback synchronously if elapsed is 0', () => {
    const callback = jest.fn().mockName('callback');
    scheduleCallbackArgs([{ elapsed: 0, args: [] }], callback);
    expect(setTimeout).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith();
});

test('invokes callback asynchronously if elapsed > 0', () => {
    const callback = jest.fn().mockName('callback');
    scheduleCallbackArgs([{ elapsed: 1, args: [] }], callback);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
});

test('invokes callback at or around specified time', () => {
    const callback = jest.fn().mockName('callback');
    scheduleCallbackArgs([{ elapsed: 500, args: [] }], callback);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
    jest.advanceTimersByTime(400);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalled();
});

test('invokes multiple times, sync and then async', () => {
    const callback = jest.fn().mockName('callback');
    scheduleCallbackArgs(
        [
            { elapsed: 0, args: [] },
            { elapsed: 500, args: [] },
            { elapsed: 1000, args: [] }
        ],
        callback
    );
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith();
    jest.advanceTimersByTime(600);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(3);
});

test('passes args, preserving identity', () => {
    const callback = jest.fn().mockName('callback');
    const aParticularObject = {};
    const aParticularFn = () => {};
    const schedule = [
        { elapsed: 0, args: [aParticularObject, aParticularFn] },
        { elapsed: 4000, args: [aParticularFn, aParticularObject] }
    ];
    scheduleCallbackArgs(schedule, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(aParticularObject, aParticularFn);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(aParticularFn, aParticularObject);
});

test('passes args returned from schedule callbacks', () => {
    const callback = jest.fn().mockName('callback');
    const argsFac = () => ['generated', 'args'];
    const schedule = [
        { elapsed: 1000, args: ['literal', 'args'] },
        { elapsed: 4000, args: argsFac }
    ];
    scheduleCallbackArgs(schedule, callback);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('literal', 'args');
    expect(callback).toHaveBeenLastCalledWith('generated', 'args');
});

test('runs subsequent calls if one errored, catching and logging errors', () => {
    const callback = jest.fn().mockName('callback');
    scheduleCallbackArgs(
        [
            // tolerates args factory throwing
            {
                elapsed: 0,
                args: () => {
                    throw 'nooo';
                }
            },
            // still runs...
            { elapsed: 10, args: ['called10'] },
            // tolerates callback throwing
            {
                elapsed: 10,
                args: () => {
                    callback.mockImplementationOnce(() => {
                        throw 'aaaa';
                    });
                    return ['calledButThrew'];
                }
            },
            // still runs...
            { elapsed: 40, args: ['called40'] }
        ],
        callback
    );
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(3);
    const { calls } = callback.mock;
    expect(calls[0][0]).toBe('called10');
    expect(calls[1][0]).toBe('calledButThrew');
    expect(calls[2][0]).toBe('called40');
});

test('cancels pending when .cancel() method is called on return obj', () => {
    const callback = jest.fn().mockName('callback');
    let pending;
    const pend = () => {
        pending = scheduleCallbackArgs(
            [
                { elapsed: 0, args: ['happens'] },
                { elapsed: 10, args: ['happens again'] },
                { elapsed: 20, args: ['never happens'] }
            ],
            callback
        );
    };
    pend();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('happens');
    expect(pending).toMatchObject({
        cancel: expect.any(Function)
    });
    pending.cancel();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('happens');
    callback.mockClear();
    pend();
    jest.advanceTimersByTime(15);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('happens again');
    pending.cancel();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('happens again');
});
