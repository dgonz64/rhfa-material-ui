import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import TextField from '@material-ui/core/TextField'

import config from './enzymeConfig'
import {
  createSchema,
  Autoform,
} from '../src/index'

const custom = createSchema('simple', {
  name: {
    type: 'string',
  },
  numberer: {
    type: 'number'
  },
  radiator: {
    type: 'radios',
    options: ['a', 'b']
  },
  booler: {
    type: 'boolean'
  }
})

test('Submits', async () => {
  let doSubmit
  const wasSubmitted = new Promise((resolve) => {
    doSubmit = resolve 
  })
  const mockSubmit = jest.fn(() => {
    doSubmit()
  })

  const app = mount(
    <Autoform schema={custom} onSubmit={mockSubmit} />
  )

  const input = app.find('input[name="name"]')
  input.instance().value = 'Hello'

  const numberer = app.find('input[name="numberer"]')
  numberer.instance().value = 128

  const radiator = app.find('input[name="radiator"][value="b"]')
  radiator.instance().checked = true

  const booler = app.find('input[name="booler"]')
  booler.instance().checked = true

  const Form = app.find(Autoform)
  await act(async () => {
    await Form.simulate('submit')
  })

  expect.assertions(2)
  const { calls } = mockSubmit.mock
  return wasSubmitted.then(() => {
    expect(calls.length).toBe(1)
    expect(calls[0][0]).toStrictEqual({
      name: 'Hello',
      numberer: 128,
      radiator: 'b',
      booler: true
    })
  })
})
