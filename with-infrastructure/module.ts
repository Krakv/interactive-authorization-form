export function validateForm(emailInput : HTMLInputElement, passwordElement : HTMLInputElement, message : HTMLDivElement) {
    const password = passwordElement.value
    const passwordMinLength = 6
  
    if (!emailInput?.checkValidity() || emailInput.value === '') {
      message.textContent = 'Некорректный email'
      changeMessageColor("red", message)
      return false
    }
    if (password.length < passwordMinLength) {
      message.textContent = 'Пароль должен быть не менее 6 символов'
      changeMessageColor("red", message)
      return false
    }
    message.textContent = ''
    return true
  }

export function check(emailElement : HTMLInputElement, passwordElement : HTMLInputElement, message : HTMLDivElement) {
    const correctEmail = 'test@test.ru'
    const correctPassword = 'easyPassword1234567890'

    const email = emailElement.value
    const password = passwordElement.value

    if (email === correctEmail && password === correctPassword) {
        if (message) message.textContent = 'Добро пожаловать!'
        changeMessageColor("green", message)
        return true
    } else {
        if (message) message.textContent = 'Неверный логин или пароль'
        changeMessageColor("red", message)
        return false
    }
}

export function changeMessageColor(color : string, messageDiv : HTMLDivElement) {
    messageDiv.className = color;
  }