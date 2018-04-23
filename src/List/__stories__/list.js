import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';

import List from '..';
import docs from '../__docs__/list.md';

const data = {
    s: { id: 's', value: 'Small' },
    m: { id: 'm', value: 'Medium' },
    l: { id: 'l', value: 'Large' }
};

const stories = storiesOf('List', module);

stories.add(
    'default',
    withReadme(docs, () => (
        <List classes={{ root: 'foo' }} items={new Map(Object.entries(data))} />
    ))
);
