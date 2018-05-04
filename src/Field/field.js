import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import Control from './control';
import ControlGroup from './controlGroup';

const groupTypes = ['checkbox', 'radio'];
const isGroupType = type => groupTypes.includes(type);

class Field extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            control: PropTypes.string,
            controls: PropTypes.string,
            group: PropTypes.string,
            label: PropTypes.string,
            message: PropTypes.string,
            root: PropTypes.string
        }),
        label: PropTypes.node,
        message: PropTypes.node,
        type: PropTypes.string,
        value: PropTypes.any
    };

    static defaultProps = {
        classes: {}
    };

    get children() {
        const { children, type } = this.props;

        if (children) {
            return children;
        }

        return isGroupType(type) ? this.controlGroup : this.control;
    }

    get control() {
        const { classes, label, type, value } = this.props;
        const controlProps = { type, value };

        return (
            <label className={classes.control}>
                <span className={classes.label}>{label}</span>
                <Control {...controlProps} onChange={this.handleChange} />
            </label>
        );
    }

    get controlGroup() {
        const { classes, label, options, type, value } = this.props;
        const controlProps = { options, type, value };

        return (
            <div className={classes.controls}>
                <span className={classes.label}>{label}</span>
                <div className={classes.group}>
                    <ControlGroup
                        {...controlProps}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }

    render() {
        const { children, props } = this;
        const { classes, message } = props;

        return (
            <div className={classes.root}>
                {children}
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
