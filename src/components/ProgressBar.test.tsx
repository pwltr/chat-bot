import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ProgressBar from './ProgressBar'

describe('<ProgressBar /> spec', () => {
  it('renders the component with the correct test ID', () => {
    render(<ProgressBar data-testid="progressbar" percentage={30} />)
    expect(screen.getByTestId('progressbar')).toBeInTheDocument()
  })
})
