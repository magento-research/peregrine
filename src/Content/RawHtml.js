import { createElement, Component } from 'react';
import { string } from 'prop-types';

export default class RawHtml extends Component {
    static propTypes = {
        sanitizedRawHtml: string.isRequired,
        wrapperTag: string
    };

    static defaultProps = {
        wrapperTag: 'span',
        className: 'peregrine-raw-html'
    };

    render() {
        const {
            wrapperTag: WrapperTag,
            sanitizedRawHtml,
            ...domProps
        } = this.props;

        return (
            <WrapperTag
                {...domProps}
                dangerouslySetInnerHTML={{
                    __html: sanitizedRawHtml
                }}
            />
        );
    }
}
