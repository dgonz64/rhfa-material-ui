import React from 'react'
// import { renderLectures } from './renderLectures'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

import { trField } from 'react-hook-form-auto'

const renderRemove = ({ idx, closeButton }) =>
  <TableCell key={idx}>
    {closeButton}
  </TableCell>

const renderTableHeader = ({ schema }) => {
  const subType = schema.getType()
  const schemaDef = schema.getSchema()
  const fields = Object.keys(schemaDef)

  return (
    <TableRow>
      <TableCell />
      {
        fields.map(sub =>
          <TableCell key={sub}>
            {trField(subType, sub)}
          </TableCell>
        )
      }
    </TableRow>
  )
}

const renderItems = ({ items }) =>
  items.map(({ idx, closeButton, inputs }) => {
    const tdedInputs = inputs && inputs.map(input => {
      return (
        <TableCell key={input.props.name}>
          {input}
        </TableCell>
      )
    })

    return (
      <TableRow key={idx}>
        {renderRemove({ idx, closeButton })}
        {tdedInputs}
      </TableRow>
    )
  })

export const ArrayTable = (props) =>
  <>
    {/* renderLectures(props) */}
    <Table aira-label="simple table">
      <TableHead>
        {renderTableHeader(props)}
      </TableHead>
      <TableBody>
        {renderItems(props)}
      </TableBody>
    </Table>
  </>
