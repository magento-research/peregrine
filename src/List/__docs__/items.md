# Items

The `Items` component is a direct child of the `List` component. As a fragment, it returns its children directly, with no wrapping element.

## Usage

See `List`.

## Props

Prop Name | Required? | Description
--------- | :-------: | :----------
items | ✅ | A keyed collection of data objects, preferably an ES2015 `Map`
renderItem | ❌ | A [render prop](https://reactjs.org/docs/render-props.html). Also accepts a tagname string
selectionModel | ❌ | An enum string corresponding to a selection model. Currently accepts `radio` (default) and `check`
