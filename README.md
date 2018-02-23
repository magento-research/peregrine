# Peregrine

A collection of UI components for the Magento PWA.

## Install
```sh
npm install @magento/peregrine
```

## Documentation
Each component's documentation can be found in the [`docs`](docs) directory.

## Components
### [Simulators](docs/Simulators.md)
Testing and development components for simulating network conditions and other testable situations.
 - [`<DelayedProps initial={empty}, delay={2000}, updated={full}>`](docs/Simulators.md#delayed_props) &ndash; Passes updated props to its children on a timer. Test progressive load states!
 - [`<ScheduledPropUpdates schedule>`](docs/Simulators.md#scheduled_prop_updates) &ndash; Configurable with a schedule array to update child props multiple times on successive timers. For more complex scenarios than `DelayedProps`.
