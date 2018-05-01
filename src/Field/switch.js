import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

class Switch extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        type: PropTypes.string.isRequired
    };

    static defaultProps = {
        classes: {}
    };

    get input() {
        const { classes, ...restProps } = this.props;
        const inputProps = {
            ...restProps,
            className: classes.input,
            onChange: this.handleChange
        };

        return <input {...inputProps} />;
    }

    render() {
        const { input, props } = this;
        const { classes } = props;

        return <span className={classes.root}>{input}</span>;
    }

    handleChange = event => {
        const { onChange } = this.props;
        const { checked, value } = event.target;

        if (onChange) {
            onChange(value, checked);
        }
    };
}

export default Switch;
