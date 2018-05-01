import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import Control from './control';

const groupTypes = ['checkbox', 'radio'];
const isGroupType = type => groupTypes.includes(type);

class Field extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            label: PropTypes.string,
            message: PropTypes.string,
            root: PropTypes.string
        }),
        label: PropTypes.node.isRequired,
        message: PropTypes.node,
        type: PropTypes.string,
        value: PropTypes.any
    };

    static defaultProps = {
        classes: {}
    };

    get control() {
        const { classes, label, type, value } = this.props;
        const controlProps = { type, value };

        return (
            <label className={classes.controls}>
                <span className={classes.label}>{label}</span>
                <Control {...controlProps} onChange={this.handleChange} />
            </label>
        );
    }

    get controlGroup() {
        const { classes, label, type, value } = this.props;
        const controlProps = { type, value };

        return (
            <div className={classes.controls}>
                <span className={classes.label}>{label}</span>
                <ControlGroup {...controlProps} onChange={this.handleChange} />
            </div>
        );
    }

    render() {
        const { children, classes, message, type } = this.props;
        const control = isGroupType(type) ? this.controlGroup : this.control;

        return (
            <div className={classes.root}>
                {children || control}
                <p className={classes.message}>{message}</p>
            </div>
        );
    }

    handleChange = (name, value) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(name, value);
        }
    };
}

export default Field;
