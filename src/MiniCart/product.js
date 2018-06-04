import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            actions: PropTypes.string,
            delete: PropTypes.string,
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.string,
            product: PropTypes.string,
            quantity: PropTypes.string,
            root: PropTypes.string
        })
    }

    render() {
        const { classes, item } = this.props;
        const { image, name, price, quantity, uri } = item;

        return (
            <li className={classes.root}>
                <div className={classes.product}>
                    <img className={classes.image} src={image} alt={name} />
                    <Link className={classes.name} to={uri}>{name}</Link>
                    <span className={classes.price}>{price}</span>
                    <input className={classes.quantity} type="tel" value={quantity} disabled />
                </div>
                <div className={classes.actions}>
                    <button className={classes.delete}>
                        Delete
                    </button>
                </div>
            </li>
        );
    }
}

export default Product;
