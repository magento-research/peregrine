import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import fromRenderProp from '../util/fromRenderProp';
import Items from './items';

class List extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        items: PropTypes.instanceOf(Map).isRequired,
        render: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        onSelectionChange: PropTypes.func,
        selectionModel: PropTypes.oneOf(['check', 'radio'])
    };

    static defaultProps = {
        classes: {},
        items: new Map(),
        render: 'div',
        renderItem: 'div',
        selectionModel: 'radio'
    };

    render() {
        const {
            classes,
            items,
            render,
            renderItem,
            onSelectionChange,
            selectionModel,
            ...restProps
        } = this.props;

        const customProps = {
            classes,
            items,
            onSelectionChange,
            selectionModel
        };

        const Root = fromRenderProp(render, Object.keys(customProps));

        return (
            <Root className={classes.root} {...customProps} {...restProps}>
                <Items
                    items={items}
                    renderItem={renderItem}
                    selectionModel={selectionModel}
                    onSelectionChange={this.handleSelectionChange}
                />
            </Root>
        );
    }

    handleSelectionChange = selection => {
        const { onSelectionChange } = this.props;

        if (onSelectionChange) {
            onSelectionChange(selection);
        }
    };
}

export default List;
