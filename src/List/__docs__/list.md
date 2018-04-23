# List

The `List` component maps a collection of data objects into an array of elements. It also manages the selection and focus of those elements.

## Usage

```jsx
import { List } from '@magento/peregrine';

const basicItems = new Map()
    .set('s', 'Small')
    .set('m', 'Medium')
    .set('l', 'Large')

<List
    classes={{ root: 'foo' }}
    items={basicItems}
    render="select"
    renderItem="option"
/>

const complexItems = new Map()
    .set('s', { id: 's', value: 'Small' })
    .set('m', { id: 'm', value: 'Medium' })
    .set('l', { id: 'l', value: 'Large' })

// let `Select` and `Option` be React components
<List
    classes={{ root: 'bar' }}
    items={complexItems}
    render={Select}
    renderItem={Option}
    onSelectionChange={selection => { console.log(selection); }}
/>
```

## Props

Prop Name | Required? | Description
--------- | :-------: | :----------
classes | ❌ | A classname hash
items | ✅ | A keyed collection of data objects, preferably an ES2015 `Map`
render | ✅ | A [render prop](https://reactjs.org/docs/render-props.html). Also accepts a tagname string
renderItem | ❌ | A [render prop](https://reactjs.org/docs/render-props.html). Also accepts a tagname string
onSelectionChange | ❌ | A callback fired the selection state changes
selectionModel | ❌ | An enum string corresponding to a selection model. Currently accepts `radio` (default) and `check`
