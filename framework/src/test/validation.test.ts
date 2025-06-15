import { validateForm, checkCredentials } from '@/modules/module'

describe('validateForm function', () => {
  it('should return isValid true for valid email and password', () => {
    const result = validateForm('test@test.com', 'password123')
    expect(result.isValid).toBe(true)
    expect(result.message).toBe('')
    expect(result.type).toBe('success')
  })

  it('should return error for empty email', () => {
    const result = validateForm('', 'password123')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Некорректный email')
    expect(result.type).toBe('error')
  })

  it('should return error for invalid email format', () => {
    const result = validateForm('not-an-email', 'password123')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Некорректный email')
    expect(result.type).toBe('error')
  })

  it('should return error for short password', () => {
    const result = validateForm('test@test.com', 'short')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Пароль должен быть не менее 6 символов')
    expect(result.type).toBe('error')
  })

  it('should return error for empty password', () => {
    const result = validateForm('test@test.com', '')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Пароль должен быть не менее 6 символов')
    expect(result.type).toBe('error')
  })
})

describe('checkCredentials function', () => {
  it('should return success for correct credentials', () => {
    const result = checkCredentials('test@test.ru', 'easyPassword1234567890')
    expect(result.isValid).toBe(true)
    expect(result.message).toBe('Добро пожаловать!')
    expect(result.type).toBe('success')
  })

  it('should return error for incorrect email', () => {
    const result = checkCredentials('wrong@email.com', 'easyPassword1234567890')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Неверный логин или пароль')
    expect(result.type).toBe('error')
  })

  it('should return error for incorrect password', () => {
    const result = checkCredentials('test@test.ru', 'wrongPassword')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Неверный логин или пароль')
    expect(result.type).toBe('error')
  })

  it('should return error for incorrect email and password', () => {
    const result = checkCredentials('wrong@email.com', 'wrongPassword')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Неверный логин или пароль')
    expect(result.type).toBe('error')
  })

  it('should be case sensitive for email', () => {
    const result = checkCredentials('Test@test.ru', 'easyPassword1234567890')
    expect(result.isValid).toBe(false)
  })

  it('should be case sensitive for password', () => {
    const result = checkCredentials('test@test.ru', 'EasyPassword1234567890')
    expect(result.isValid).toBe(false)
  })
})
