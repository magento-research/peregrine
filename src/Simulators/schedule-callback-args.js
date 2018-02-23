/**
 * @typedef {Object} UpdateEvent
 * @property {Number} elapsed - Milliseconds after the `scheduleCallbackArgs()`
 *     call to invoke the callback. `0` will invoke immediately. The same
 *     number twice will invoke twice at the same (rough) time, but in two
 *     different event loops.
 *     Each `elapsed` value represents time elapsed from the initial call,
 *     not the time between subsequent calls. So if you want to call the
 *     callback three times, with a 1-second gap before each time, your
 *     schedule would be:
 *     [
 *       { elapsed: 1000, args: args },
 *       { elapsed: 2000, args: args },
 *       { elapsed: 3000, args: args }
 *     ]
 *
 * @property {*[]|Function} args - Array of values to use as function
 *     arguments at the appointed time. Can also be a function that returns
 *     such an array.
 */

/**
 * @typedef {Object} Disposer
 * @property {Function} cancel - Call to cancel any pending operations on
 *     the original schedule.
 */

/**
 * Validate one of these update events.
 * @private
 */
const badUpdateEvent = update =>
    isNaN(Number(update.elapsed)) ||
    (typeof update.args !== 'function' && !Array.isArray(update.args));

/**
 * Describe how and when to call a function over time, using an array of
 * configuration objects.
 *
 * Use to test the behavior of asynchronous listeners and components.
 *
 * Returns an object with a `.cancel()` method, which when called will
 * cancel any updates not yet executed.
 *
 * @param {UpdateEvent[]} schedule List of { elapsed: number, args: any[] }
 *    objects describing the timing and arguments for executing the callback.
 * @param {Function} callback Callback to be invoked on the schedule, with the
 *    configured arguments.
 * @returns {Disposer}
 */
export default function scheduleCallbackArgs(schedule, callback) {
    if (
        !Array.isArray(schedule) ||
        schedule.length < 1 ||
        schedule.some(badUpdateEvent) ||
        typeof callback !== 'function'
    ) {
        throw Error(
            'scheduleCallbackArgs: First argument must be an array of 1 or more { elapsed: number, args: any[] } objects, and second argument must be a callback function.'
        );
    }
    const timers = [];
    const disposer = {
        cancel() {
            timers.forEach(clearTimeout);
        }
    };
    for (const { elapsed, args } of schedule) {
        const delay = Number(elapsed);

        const nextArgs = Array.isArray(args) ? () => args : args;
        const invoke = () => {
            try {
                callback(...nextArgs());
            } catch (e) {
                console.error(e);
            }
        };
        if (elapsed === 0) {
            invoke();
        } else {
            timers.push(setTimeout(invoke, delay));
        }
    }
    return disposer;
}
