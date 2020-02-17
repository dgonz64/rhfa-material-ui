# rhfa-material-ui

This library allows your React application to automatically generate forms using [ReactHookForm](https://react-hook-form.com/) and rendering by Material-UI. The form and validations are generated following a schema inspired by [SimpleSchema](https://github.com/aldeed/simple-schema-js).

## [Play with the demo](https://dgonz64.github.io/rhfa-material-ui-demo/demo/)

## Installation

    $ npm install react-hook-form rhfa-material-ui --save

## Usage

Just like `react-hook-form-auto` except you import `rhfa-material-ui`:

```javascript
    import { createSchema, Autoform } from 'rhfa-material-ui'

    export const client = createSchema('client', {
      name: {
        type: 'string',
        required: true,
        max: 32
      },
      age: {
        type: 'number'
      }
    })

    const MyForm = ({ onSubmit }) =>
      <Autoform
        schema={client}
        onSubmit={onSubmit}
      />
```

## [Documentation](https://github.com/dgonz64/react-hook-form-auto)
