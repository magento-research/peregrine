import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import fromRenderProp from '../util/fromRenderProp';

class Item extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        hasFocus: PropTypes.bool,
        isSelected: PropTypes.bool,
        item: PropTypes.any.isRequired,
        render: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
            .isRequired
    };

    static defaultProps = {
        classes: {},
        hasFocus: false,
        isSelected: false,
        render: 'div'
    };

    render() {
        const {
            classes,
            hasFocus,
            isSelected,
            item,
            render,
            ...restProps
        } = this.props;
        const customProps = { classes, hasFocus, isSelected, item };
        const Root = fromRenderProp(render, Object.keys(customProps));

        return (
            <Root className={classes.root} {...customProps} {...restProps}>
                {`${item}`}
            </Root>
        );
    }
}

export default Item;
