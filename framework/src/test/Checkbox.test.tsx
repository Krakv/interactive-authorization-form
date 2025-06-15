import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '@/components/CheckBox'
import '@testing-library/jest-dom'

describe('Checkbox компонент', () => {
  it('renders correctly with label', () => {
    render(
      <Checkbox
        id="test-checkbox"
        checked={false}
        onChange={() => {}}
        label="Test checkbox"
      />
    )

    expect(screen.getByLabelText('Test checkbox')).toBeInTheDocument()
  })

  it('вызывает onChange при нажатии', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()

    render(
      <Checkbox
        id="test-checkbox"
        checked={false}
        onChange={handleChange}
        label="Test checkbox"
      />
    )

    await user.click(screen.getByLabelText('Test checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
