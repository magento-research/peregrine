import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { RawHtml } from '..';
import docs from '../__docs__/RawHtml.md';

storiesOf('RawHtml', module)
    .addDecorator(withReadme(docs))
    .add('Raw HTML', () => (
        <RawHtml sanitizedRawHtml="<p><em>HTML fallback content</em></p><img src='https://placebeard.it/420/320'/>" />
    ))
    .add('Raw HTML with custom wrapper tag', () => (
        <RawHtml
            sanitizedRawHtml="<p><em>HTML fallback content</em></p><img src='https://placebeard.it/320/240'/>"
            wrapperTag="article"
            wrapperProps={{ style: { background: 'whitesmoke' } }}
        />
    ));
