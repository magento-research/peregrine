# Item

The `Item` component is a direct child of the `Items` fragment.

## Usage

See `List`.

## Props

Prop Name | Required? | Description
--------- | :-------: | :----------
`classes` | ❌ | A classname hash
`hasFocus` | ❌ | Whether the element currently has browser focus
`isSelected` | ❌ | Whether the item is currently selected 
`item` | ✅ | A data object. By default, `item` is rendered as a raw string
`render` | ✅ | A [render prop](https://reactjs.org/docs/render-props.html). Also accepts a tagname string
