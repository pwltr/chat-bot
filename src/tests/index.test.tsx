import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ConversationService from '@services/api/conversation'
import Home from '@pages/index'
import { steps } from './mockData'

jest.mock('@services/api/conversation')

describe('<Home /> spec', () => {
  it('renders the correct question', () => {
    render(<Home steps={steps} />)
    expect(screen.getByText('Benötigen Sie eine Haftplichtversicherung?')).toBeInTheDocument()
  })

  it('renders the correct question after click', async () => {
    render(<Home steps={steps} />)

    const button = await screen.getByTestId('button-liability-Ja')
    button.click()

    expect(screen.getByText('Benötigen Sie eine Kasko?')).toBeInTheDocument()
  })

  it('renders thank you message and submits the correct data', async () => {
    render(<Home steps={steps} />)

    const button1 = await screen.getByTestId('button-liability-Ja')
    button1.click()

    const button2 = await screen.getByTestId('button-casco-Nein')
    button2.click()

    const button3 = await screen.getByTestId('button-licensePlateType-Einzelkennzeichen')
    button3.click()

    expect(screen.getByText('Herzlichen Dank für Ihre Angaben!')).toBeInTheDocument()

    await waitFor(() => expect(ConversationService.sendAnswers).toHaveBeenCalledTimes(1))

    expect(ConversationService.sendAnswers).toHaveBeenCalledWith([
      { name: 'liability', value: true },
      { name: 'casco', value: false },
      { name: 'licensePlateType', value: 'ekz' },
    ])
  })
})
