import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import List from '../List';
import Product from './product';

class Products extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        })
    }

    render() {
        return (
            <List renderItem={Product} {...this.props} />
        );
    }
}

export default Products;
