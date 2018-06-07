# RichContent

The `RichContent` component is a utility component for rendering visual content
delivered by an external data provider. It can render raw HTML supplied as
a string.

CMS and catalog systems often store HTML content in the server-side database,
and deliver that content in API responses as a raw string. PWA Studio provides
the `RichContent` component to easily embed content for this common
situation.

## Usage

```jsx
import React from 'react';
import { RichContent } from '@magento/peregrine';

class ItemDescription extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="desc-container">
                <h3>Description</h3>
                <RichContent sanitizedRawHtml={data.long_description} />
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
| `wrapperProps`     |           | Optional object to be passed as props to the `wrapperTag`. Default `{ className: "peregrine-raw-html" }`.

## Notes

- The `RichContent` component will wrap `sanitizedRawHtml` content with a parent
  element for compatibility with React. The default wrapper tag is a `span` with
  a default classname:

  ```html
  <RichContent
      sanitizedRawHtml="<h2>Header</h2><p>body text</p>" />

  <!-- emits this HTML: -->
  <span class="peregrine-raw-html">
    <h2>Header</h2><p>body text</p>
  </span>
  ```

  Use the `wrapperTag` string prop and `wrapperProps` object prop to customize
  the  parent tag:

  ```html
  <RichContent
      sanitizedRawHtml="<h2>Header</h2><p>body text</p>"
      wrapperTag="section"
      wrapperProps={{ className: "product-description loading" }}
  />

  <!-- emits this HTML: -->
  <section class="product-description loading">
    <h2>Header</h2><p>body text</p>
  </section>
  ```

- ⚠️⚠️ **`RichContent` does *not* sanitize its input in any way. It is the
  responsibility of the data provider to ensure that the HTML is safe,
  contains no script tags and no escaping issues.**
