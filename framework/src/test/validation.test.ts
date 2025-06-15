import { validateForm, checkCredentials } from '@/modules/module'

describe('Функция validateForm', () => {
  it('должна возвращать isValid=true для валидных email и пароля', () => {
    const result = validateForm('test@test.com', 'password123')
    expect(result.isValid).toBe(true)
    expect(result.message).toBe('')
    expect(result.type).toBe('success')
  })

  it('должна возвращать ошибку при пустом email', () => {
    const result = validateForm('', 'password123')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Некорректный email')
    expect(result.type).toBe('error')
  })

  it('должна возвращать ошибку при неверном формате email', () => {
    const result = validateForm('не-email', 'password123')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Некорректный email')
    expect(result.type).toBe('error')
  })

  it('должна возвращать ошибку при коротком пароле', () => {
    const result = validateForm('test@test.com', 'корот')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Пароль должен быть не менее 6 символов')
    expect(result.type).toBe('error')
  })

  it('должна возвращать ошибку при пустом пароле', () => {
    const result = validateForm('test@test.com', '')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Пароль должен быть не менее 6 символов')
    expect(result.type).toBe('error')
  })
})

describe('Функция checkCredentials', () => {
  it('должна возвращать успех при верных учетных данных', () => {
    const result = checkCredentials('test@test.ru', 'easyPassword1234567890')
    expect(result.isValid).toBe(true)
    expect(result.message).toBe('Добро пожаловать!')
    expect(result.type).toBe('success')
  })

  it('должна возвращать ошибку при неверном email', () => {
    const result = checkCredentials('неверный@email.com', 'easyPassword1234567890')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Неверный логин или пароль')
    expect(result.type).toBe('error')
  })

  it('должна возвращать ошибку при неверном пароле', () => {
    const result = checkCredentials('test@test.ru', 'неверныйПароль')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Неверный логин или пароль')
    expect(result.type).toBe('error')
  })

  it('должна возвращать ошибку при неверном email и пароле', () => {
    const result = checkCredentials('неверный@email.com', 'неверныйПароль')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Неверный логин или пароль')
    expect(result.type).toBe('error')
  })

  it('должна учитывать регистр в email', () => {
    const result = checkCredentials('Test@test.ru', 'easyPassword1234567890')
    expect(result.isValid).toBe(false)
  })

  it('должна учитывать регистр в пароле', () => {
    const result = checkCredentials('test@test.ru', 'EasyPassword1234567890')
    expect(result.isValid).toBe(false)
  })
})