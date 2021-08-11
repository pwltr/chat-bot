import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Home from '@pages/index'

type TOption = {
  nextId: number
  value: number | string | boolean
  text: string
}

type TStep = {
  id: number
  name: string
  text: string
  uiType: 'button'
  valueType: 'number' | 'string' | 'boolean'
  valueOptions: TOption[]
}


// TODO: mock fetch and get mock data
const steps = [
  {
    id: 100,
    name: 'liability',
    text: 'Benötigen Sie eine Haftplichtversicherung?',
    uiType: 'button',
    valueType: 'boolean',
    valueOptions: [
      {
        nextId: 200,
        value: true,
        text: 'Ja',
      },
      {
        nextId: 200,
        value: false,
        text: 'Nein',
      },
    ],
  },
  {
    id: 200,
    name: 'casco',
    text: 'Benötigen Sie eine Kasko?',
    uiType: 'button',
    valueType: 'boolean',
    valueOptions: [
      {
        nextId: 201,
        value: true,
        text: 'Ja',
      },
      {
        nextId: 300,
        value: false,
        text: 'Nein',
      },
    ],
  },
  {
    id: 201,
    name: 'cascoType',
    text: 'Welche Art von Kasko benötigen Sie?',
    uiType: 'button',
    valueType: 'string',
    valueOptions: [
      {
        nextId: 300,
        value: 'full',
        text: 'Vollkasko',
      },
      {
        nextId: 300,
        value: 'part',
        text: 'Teilkasko',
      },
    ],
  },
  {
    id: 300,
    name: 'licensePlateType',
    text: 'Welche Kennzeichenart benötigen Sie?',
    uiType: 'button',
    valueType: 'string',
    valueOptions: [
      {
        nextId: false,
        value: 'ekz',
        text: 'Einzelkennzeichen',
      },
      {
        nextId: 301,
        value: 'wkz',
        text: 'Wechselkennzeichen',
      },
    ],
  },
  {
    id: 301,
    name: 'vehicles',
    text: 'Wieviele Fahrzeuge wollen Sie versichern?',
    uiType: 'button',
    valueType: 'number',
    valueOptions: [
      {
        nextId: false,
        value: 2,
        text: 'Zwei Fahrzeuge',
      },
      {
        nextId: false,
        value: 3,
        text: 'Drei Fahrzeuge',
      },
    ],
  },
] as TStep[]

describe('<Home /> spec', () => {
  it('renders the correct question', () => {
    render(<Home steps={steps} />)
    expect(screen.getByText('Benötigen Sie eine Haftplichtversicherung?')).toBeInTheDocument()
  })

  // it('renders the correct question after click', async () => {
  //   render(<Home steps={steps} />)

  //   const button = await screen.findByText('Ja')
  //   button.click()

  //   expect(screen.findByText('Benötigen Sie eine Kasko?')).toBeInTheDocument()
  // })
})
