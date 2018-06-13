# RawHtml

The `RawHtml` component is a utility component for rendering visual content
delivered by an external data provider. It can render raw HTML supplied as
a string.

CMS and catalog systems often store HTML content in the server-side database,
and deliver that content in API responses as a raw string. PWA Studio provides
the `RawHtml` component to easily embed content for this common
situation.

## Usage

```jsx
import React from 'react';
import { RawHtml } from '@magento/peregrine';

class ItemDescription extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="desc-container">
                <h3>Description</h3>
                <RawHtml sanitizedRawHtml={data.long_description} />
            </div>
        );
    }
}
```

## Props

| Prop Name          | Required? |                                         Description |
| ------------------ | :-------: | --------------------------------------------------: |
| `sanitizedRawHtml` |    ✅      | A string of raw HTML to display. Ignored if `children` are also passed and are not null.
| `wrapperTag`       |           | Optional HTML tag to use as a custom wrapper element. Default `span.`.

Additional DOM properties set on `RawHTML` will be passed to the wrapper tag.

## Notes

- The `RawHtml` component will wrap `sanitizedRawHtml` content with a parent
  element for compatibility with React. The default wrapper tag is a `span` with
  a default classname:

  ```html
  <RawHtml
      sanitizedRawHtml="<h2>Header</h2><p>body text</p>" />

  <!-- emits this HTML: -->
  <span class="peregrine-raw-html">
    <h2>Header</h2><p>body text</p>
  </span>
  ```

  Use the `wrapperTag` string prop additional DOM props to customize
  the parent tag:

  ```html
  <RawHtml
      sanitizedRawHtml="<h2>Header</h2><p>body text</p>"
      wrapperTag="section"
      className="product-description loading"
  />

  <!-- emits this HTML: -->
  <section class="product-description loading">
    <h2>Header</h2><p>body text</p>
  </section>
  ```

- ⚠️⚠️ **`RawHtml` does *not* sanitize its input in any way. It is the
  responsibility of the data provider to ensure that the HTML is safe,
  contains no script tags and no escaping issues.**
