import { createElement, Component } from 'react';
import { object, string } from 'prop-types';

export default class RawHtml extends Component {
    static propTypes = {
        sanitizedRawHtml: string.isRequired,
        wrapperTag: string,
        wrapperProps: object
    };

    static defaultProps = {
        wrapperTag: 'span',
        wrapperProps: {
            className: 'peregrine-raw-html'
        }
    };

    render() {
        // JSX tags must be in PascalCase
        const WrapperTag = this.props.wrapperTag;

        return (
            <WrapperTag
                {...this.props.wrapperProps}
                dangerouslySetInnerHTML={{
                    __html: this.props.sanitizedRawHtml
                }}
            />
        );
    }
}
