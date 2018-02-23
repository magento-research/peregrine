<a id="delayed_props"></a>
### `<DelayedProps initial={empty}, delay={2000}, updated={full}>`

Renders its children twice to simulate the common progressive-load scenario where a component must display something before its data set is ready. Often this means the component will receive an empty data set as a prop, and will have to display a loading state until the real data is retrieved.

#### Usage
```jsx
import { DelayedProps } from '@magento/peregrine/Simulators';

<div className="wrapper" data-mid="some.container">
    <DelayedProps initial="Loading State..." delay={1500} updated="Done!" >
        {status => (<span>{status}</span>)}
    </DelayedProps>
</div>
```

#### Props

| Prop Name | Required? |                                                                                  Description |
| --------- | :-------: | -------------------------------------------------------------------------------------------: |
| `initial` |           | The value to pass on the first, immediate render. Omit to render only once, after the delay. |
| `delay`   |     ✅     |        A `Number` representing the number of milliseconds to delay before the second render. |
| `updated` |     ✅     |                                                     The value to pass on the delayed render. |

#### Children
Since `DelayedProps` must re-render its children and pass them values, it doesn't take literal JSX nodes as children. Instead it uses the [function-as-child](https://reactjs.org/docs/render-props.html#using-props-other-than-render) variant of the common React ["render props"](https://reactjs.org/docs/render-props.html) pattern. This way, its children can defer their render and receive a value.

#### Example
A `Page` renders an `ExampleGallery` that will initially show only placeholders. Its `images` prop will be an empty array.
```jsx
class Page extends React.Component {
    render() {
        return (<div>
            <ExampleGallery images={this.state.images} />
        </div>);
    }
}
```
When the images arrive from the data layer, the `Page` may set its own state.
But this is difficult to quickly test, especially if you want to observe a nice loading animation you're working on.

Use `DelayedProps` to test that out:
```jsx
import { DelayedProps } from '@magento/peregrine/Simulators';
class Page extends React.Component {
    render() {
        return (<div>
            <DelayedProps initial={this.state.images} delay={1500} updated={someMockImages}>
                {images => (
                    <ExampleGallery images={images} />
                )}
            </DelayedProps>
        </div>);
    }
}
```

<a id="scheduled_prop_updates"></a>
### `<ScheduledPropUpdates schedule>`

Renders its children an arbitrary number of times, based on the length of the
array passed to the `schedule` prop. Useful for more complex load scenarios.

#### Usage
```jsx
import { ScheduledPropUpdates } from '@magento/peregrine/Simulators';

<div className="wrapper" data-mid="some.container">
    <ScheduledPropUpdates schedule={[
        { elapsed: 0, args: ["loading-spinner", "Loading..."] },
        { elapsed: 2000, args: ["loading-spinner-faster", "Still loading..."] },
        { elapsed: 5000, args: ["loading-error", "Could not load!"] }
    ]}>
        {(className, label) => (<button className={className}>{label}</button>)}
    </ScheduledPropUpdates>
</div>
```

The array does not need to be in order. If you supply a schedule object with an `elapsed` of `0`, it will run synchronously.

#### Props
| Prop Name  | Required? |                                                                                             Description |
| ---------- | :-------: | ------------------------------------------------------------------------------------------------------: |
| `schedule` |    ✅      | An array of `{ elapsed: number, args: mixed[] }` objects saying when and with what arguments to invoke the render function passed as a child.

#### Children
Like `DelayedProps`, `ScheduledPropUpdates` uses the [function-as-child](https://reactjs.org/docs/render-props.html#using-props-other-than-render) pattern.
