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
Testing and development components for simulating progressive load or slow network conditions.
 - [`<DelayedValue initial={empty}, delay={2000}, updated={full}>`](docs/Simulators.md#delayed_value) &ndash;
 - [`<MultipleTimedRenders schedule>`](docs/Simulators.md#multiple_timed_renders) &ndash; Configurable with a schedule array to update child props multiple times on successive timers. For more complex scenarios than `DelayedValue`.
