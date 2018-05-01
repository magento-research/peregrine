import { Component, createElement } from 'react';
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

    get controls() {
        const { checkedValues } = this.state;
        const { classes, name, options, type } = this.props;
        const sharedProps = { name, type, onChange: this.handleChange };

        return options.map(optionProps => {
            const { value } = optionProps;
            const isChecked = checkedValues.has(value);

            return (
                <label key={value} className={classes.option}>
                    <span className={classes.label}>{label}</span>
                    <Switch
                        {...sharedProps}
                        {...optionProps}
                        checked={isChecked}
                    />
                </label>
            );
        });
    }

    render() {
        const { controls, props } = this;
        const { classes } = props;

        return <div className={classes.root}>{controls}</div>;
    }

    handleChange = (key, isChecked) => {
        const { name, onChange, type } = this.props;
        const isRadio = type === 'radio';
        const otherValues = isRadio ? null : this.state.checkedValues;
        const checkedValues = new Set(otherValues);

        if (isChecked) {
            checkedValues.add(key);
        } else {
            checkedValues.delete(key);
        }

        if (onChange) {
            onChange(name, checkedValues);
        }
    };
}

export default ControlGroup;
