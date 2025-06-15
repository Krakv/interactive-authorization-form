import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { AuthForm } from '@/components/AuthForm'
import { useAuthStore } from '@/store/authStore'
import { validateForm, checkCredentials } from '@/modules/module'
import '@testing-library/jest-dom'

jest.mock('@/store/authStore')
jest.mock('@/modules/module')

jest.mock('@/components/CheckBox', () => ({
  Checkbox: ({ checked, onChange, label }: never) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid="checkbox"
      />
      {label}
    </label>
  ),
}))

jest.mock('@/components/SocialsAuth', () => ({
  SocialAuth: () => <div data-testid="social-auth">Social Auth</div>,
}))

jest.mock('@/components/Message', () => ({
  Message: ({ text, type }: never) => (
    <div data-testid="message" data-type={type}>
      {text}
    </div>
  ),
}))

describe('AuthForm', () => {
  const mockSetEmail = jest.fn()
  const mockSetPassword = jest.fn()
  const mockSetRememberMe = jest.fn()
  const mockSetMessage = jest.fn()
  const mockSaveCredentials = jest.fn()
  const mockLoadCredentials = jest.fn()
  const mockClearCredentials = jest.fn()

  beforeEach(() => {
    ;(useAuthStore as unknown as jest.Mock).mockImplementation(() => ({
      email: '',
      password: '',
      rememberMe: false,
      message: '',
      messageType: '',
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
      setRememberMe: mockSetRememberMe,
      setMessage: mockSetMessage,
      saveCredentials: mockSaveCredentials,
      loadCredentials: mockLoadCredentials,
      clearCredentials: mockClearCredentials,
    }))

    jest.clearAllMocks()
  })

  it('рендерится без ошибок', () => {
    render(<AuthForm />)
    expect(screen.getByText('Вход')).toBeInTheDocument()
    expect(screen.getByTestId('social-auth')).toBeInTheDocument()
  })

  it('загружает сохраненные данные при монтировании', () => {
    render(<AuthForm />)
    expect(mockLoadCredentials).toHaveBeenCalledTimes(1)
  })

  it('обновляет email при вводе', () => {
    render(<AuthForm />)
    const emailInput = screen.getByPlaceholderText('Введите электронную почту')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com')
  })

  it('обновляет password при вводе', () => {
    render(<AuthForm />)
    const passwordInput = screen.getByPlaceholderText('Введите пароль')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    expect(mockSetPassword).toHaveBeenCalledWith('password123')
  })

  it('вызывает валидацию формы при отправке', () => {
    ;(validateForm as jest.Mock).mockReturnValue({
      isValid: false,
      message: 'Ошибка валидации',
      type: 'error',
    })

    render(<AuthForm />)
    const form = document.querySelector('form.auth__form') as HTMLFormElement
    fireEvent.submit(form)

    expect(validateForm).toHaveBeenCalledWith('', '')
  })

  it('вызывает проверку учетных данных при валидной форме', () => {
    ;(validateForm as jest.Mock).mockReturnValue({
      isValid: true,
    })
    ;(checkCredentials as jest.Mock).mockReturnValue({
      isValid: true,
      message: 'Успешный вход',
      type: 'success',
    })

    render(<AuthForm />)
    const form = document.querySelector('form.auth__form') as HTMLFormElement
    fireEvent.submit(form)

    expect(checkCredentials).toHaveBeenCalledWith('', '')
  })

  it('сохраняет учетные данные при успешном входе и включенном чекбоксе', () => {
    ;(useAuthStore as unknown as jest.Mock).mockImplementation(() => ({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true,
      message: '',
      messageType: '',
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
      setRememberMe: mockSetRememberMe,
      setMessage: mockSetMessage,
      saveCredentials: mockSaveCredentials,
      loadCredentials: mockLoadCredentials,
      clearCredentials: mockClearCredentials,
    }))
    ;(validateForm as jest.Mock).mockReturnValue({
      isValid: true,
    })
    ;(checkCredentials as jest.Mock).mockReturnValue({
      isValid: true,
      message: 'Успешный вход',
      type: 'success',
    })

    render(<AuthForm />)
    const form = document.querySelector('form.auth__form') as HTMLFormElement
    fireEvent.submit(form)

    expect(mockSaveCredentials).toHaveBeenCalled()
  })

  it('не сохраняет учетные данные при неудачном входе', () => {
    ;(validateForm as jest.Mock).mockReturnValue({
      isValid: true,
    })
    ;(checkCredentials as jest.Mock).mockReturnValue({
      isValid: false,
      message: 'Неверные учетные данные',
      type: 'error',
    })

    render(<AuthForm />)
    const form = document.querySelector('form.auth__form') as HTMLFormElement
    fireEvent.submit(form)

    expect(mockSaveCredentials).not.toHaveBeenCalled()
  })

  it('добавляет класс shake при ошибке', async () => {
    ;(validateForm as jest.Mock).mockReturnValue({
      isValid: false,
      message: 'Ошибка',
      type: 'error',
    })

    render(<AuthForm />)
    const form = document.querySelector('form.auth__form') as HTMLFormElement
    fireEvent.submit(form)

    const button = screen.getByText('Войти')
    expect(button).toHaveClass('shake')

    await waitFor(() => {
      expect(button).not.toHaveClass('shake')
    }, { timeout: 500 })
  })
})