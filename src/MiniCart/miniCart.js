import { Component, createElement } from 'react'

import Products from './products';

class MiniCart extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <dl>
                    <dt>Cart Subtotal</dt>
                    <dd>$32.00</dd>
                </dl>
                <Products />
            </div>
        );
    }
}

export default MiniCart
