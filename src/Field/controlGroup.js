import { Component, Fragment, createElement } from 'react';
import PropTypes from 'prop-types';

import Switch from './switch';

const deriveCheckedValues = ({ value }) => ({
    checkedValues: new Set(value)
});

class ControlGroup extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        onChange: PropTypes.func,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired
            })
        ).isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.array.isRequired
    };

    static defaultProps = {
        classes: {}
    };

    static getDerivedStateFromProps = deriveCheckedValues;

    state = {
        checkedValues: new Set()
    };

    render() {
        const { checkedValues } = this.state;
        const { classes, name, options, type } = this.props;
        const sharedProps = { name, type, onChange: this.handleChange };

        const children = options.map(({ label, value, ...inputProps }) => {
            const isChecked = checkedValues.has(value);

            return (
                <label key={value} className={classes.option}>
                    <span className={classes.label}>{label}</span>
                    <Switch
                        {...sharedProps}
                        {...inputProps}
                        value={value}
                        checked={isChecked}
                    />
                </label>
            );
        });

        return <Fragment>{children}</Fragment>;
    }

    handleChange = (name, value, isChecked) => {
        const { onChange, type } = this.props;
        const isRadio = type === 'radio';
        const otherValues = isRadio ? null : this.state.checkedValues;
        const checkedValues = new Set(otherValues);

        if (isChecked) {
            checkedValues.add(value);
        } else {
            checkedValues.delete(value);
        }

        if (onChange) {
            onChange(name, checkedValues);
        }
    };
}

export default ControlGroup;
