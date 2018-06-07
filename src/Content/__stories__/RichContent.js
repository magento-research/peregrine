import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { RichContent } from '..';
import docs from '../__docs__/RichContent.md';

storiesOf('RichContent', module)
    .addDecorator(withReadme(docs))
    .add('Raw HTML', () => (
        <RichContent sanitizedRawHtml="<p><em>HTML fallback content</em></p><img src='https://placebeard.it/420/320'/>" />
    ))
    .add('Raw HTML with custom wrapper tag', () => (
        <RichContent
            sanitizedRawHtml="<p><em>HTML fallback content</em></p><img src='https://placebeard.it/320/240'/>"
            wrapperTag="article"
            wrapperProps={{ style: { background: 'whitesmoke' } }}
        />
    ));
