type ValidationResult = {
  isValid: boolean
  message: string
  type?: 'error' | 'success'
}

export const validateForm = (
  email: string,
  password: string
): ValidationResult => {
  const passwordMinLength = 6

  if (!email || !email.includes('@')) {
    return {
      isValid: false,
      message: 'Некорректный email',
      type: 'error',
    }
  }

  if (password.length < passwordMinLength) {
    return {
      isValid: false,
      message: 'Пароль должен быть не менее 6 символов',
      type: 'error',
    }
  }

  return {
    isValid: true,
    message: '',
    type: 'success',
  }
}

export const checkCredentials = (
  email: string,
  password: string
): ValidationResult => {
  const correctEmail = 'test@test.ru'
  const correctPassword = 'easyPassword1234567890'

  if (email === correctEmail && password === correctPassword) {
    return {
      isValid: true,
      message: 'Добро пожаловать!',
      type: 'success',
    }
  }

  return {
    isValid: false,
    message: 'Неверный логин или пароль',
    type: 'error',
  }
}
