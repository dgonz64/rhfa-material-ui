import React from 'react'
import {
  TextField,
  MenuItem,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Typography,
  Slider,
  Button,
  IconButton,
  Card,
  CardContent
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { ArrayTable } from './components/ArrayTable'
import { ArrayPanel } from './components/ArrayPanel'
import { trField, tr, processOptions } from 'react-hook-form-auto'

const makeId = ({ schemaTypeName, name }) => `${schemaTypeName}-${name}`

const ControlAdaptor = props => {
  const {
    name,
    defaultValue,
    controlProps,
    errorText,
    overrides,

    field,
    fieldSchema,
    schemaTypeName,
    adaptorComponent,
    onChange,
    onBlur
  } = props

  const Comp = adaptorComponent

  return (
    <div>
      <Comp
        {...controlProps}
        id={makeId({ schemaTypeName, name })}
        key={name}
        name={name}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        onBlur={onBlur}
        label={trField(props)}
        error={!!errorText}
        helperText={errorText}
        {...overrides}
      />
    </div>
  )
}

export default {
  defaultWrap: ({ children }) => children,
  string: {
    render: {
      component: ControlAdaptor,
      adaptorComponent: TextField
    }
  },
  number: {
    coerce: value => parseFloat(value),
    render: {
      component: ControlAdaptor,
      adaptorComponent: TextField,
      controlProps: { type: 'number' }
    }
  },
  password: {
    render: {
      component: ControlAdaptor,
      adaptorComponent: TextField,
      controlProps: { type: 'password' }
    }
  },
  select: {
    render: (props) => {
      const {
        name,
        onChange,
        onBlur
      } = props

      const options = processOptions({
        ...props,
        addDefault: true
      })

      return {
        ...props,
        component: ControlAdaptor,
        adaptorComponent: TextField,
        controlProps: {
          select: true,
          style: { display: 'flex' },
          onChange,
          onBlur,
          children: options.map(op =>
            <MenuItem key={op.value} value={op.value}>
              {op.label}
            </MenuItem>
          )
        }
      }
    }
  },
  boolean: {
    coerce: value => Boolean(value),
    render: {
      component: (props) => {
        const {
          name,
          defaultValue,
          schemaTypeName,
          setValue,
          onBlur
        } = props

        const handleChange = event => {
          setValue(name, event.target.checked)
        }

        return (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  id={makeId({ schemaTypeName, name })}
                  name={name}
                  defaultValue={defaultValue}
                  onChange={handleChange}
                  onBlur={onBlur}
                />
              }
              label={trField(props)}
            />
          </div>
        )
      }
    }
  },
  radios: {
    render: {
      component: (props) => {
        const {
          id,
          name,
          defaultValue,
          onChange,
          onBlur
        } = props

        const label = trField(props)
        const options = processOptions(props)

        return (
          <div>
            <FormLabel component="legend">
              {label}
            </FormLabel>
            <RadioGroup
              id={id}
              aria-label={label}
              name={name}
              defaultValue={defaultValue || 0}
              onChange={onChange}
              onBlur={onBlur}
            >
              {
                options.map(op =>
                  <FormControlLabel
                    name={name}
                    key={op.value}
                    value={op.value}
                    control={<Radio />}
                    label={op.label}
                  />
                )
              }
            </RadioGroup>
          </div>
        )
      }
    }
  },
  range: {
    coerce: value => parseFloat(value),
    render: {
      component: (props) => {
        const {
          id,
          name,
          defaultValue,
          fieldSchema,
          schemaTypeName,
          onChange,
          onBlur
        } = props

        const { sliderParams } = fieldSchema

        return (
          <div>
            <Typography id={name} gutterBottom>
              {trField(props)}
            </Typography>
            <Slider
              {...sliderParams}
              id={id}
              defaultValue={defaultValue || 0}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              min={fieldSchema.min}
              max={fieldSchema.max}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
        )
      }
    }
  },
  button: {
    render: ({ styles, ...rest }) => {
      if (rest.type == 'submit')
        return <Button color="primary" {...rest} />
      else
        return <Button {...rest} />
    }
  },
  arrayButton: {
    render: ({ styles, ...rest }) =>
      <IconButton size="small" {...rest} />
  },
  form: {
    render: ({ children, onSubmit }) =>
      <form onSubmit={onSubmit}>
        {children}
      </form>
  },
  panel: {
    render: ({ children, header }) =>
      <Card>
        <CardContent>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
            component="span"
          >
            {header}
          </Typography>
          <Typography variant="body2" component={'span'}>
            {children}
          </Typography>
        </CardContent>
      </Card>
  },
  addGlyph: {
    render: () =>
      <AddIcon fontSize="small" />
  },
  removeGlyph: {
    render: () =>
      <RemoveIcon fontSize="small" />
  },
  arrayTable: {
    render: ArrayTable
  },
  arrayPanel: {
    render: ArrayPanel
  }
}
