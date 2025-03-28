export const validateForm = () => {
  const emailInput = document.getElementById('email') as HTMLInputElement
  const passwordElement = document.getElementById(
    'password'
  ) as HTMLInputElement
  const password = passwordElement.value
  const message = document.getElementById('message') as HTMLDivElement

  const passwordMinLength = 6

  if (!emailInput?.checkValidity() || emailInput.value === '') {
    message.textContent = 'Некорректный email'
    return false
  }
  if (password.length < passwordMinLength) {
    message.textContent = 'Пароль должен быть не менее 6 символов'
    return false
  }
  message.textContent = ''
  return true
}

const check = () => {
  const correctEmail = 'idtokmakov@edu.hse.ru'
  const correctPassword = 'difficultpassword2025'

  const emailElement = document.getElementById('email') as HTMLInputElement
  const email = emailElement.value
  const passwordElement = document.getElementById(
    'password'
  ) as HTMLInputElement
  const password = passwordElement.value
  const message = document.getElementById('message') as HTMLDivElement

  if (email === correctEmail && password === correctPassword) {
    if (message) message.textContent = 'Добро пожаловать!'
    return true
  } else {
    if (message) message.textContent = 'Неверный логин или пароль'
    return false
  }
}

const saveData = () => {
  const emailElement = document.getElementById('email') as HTMLInputElement
  const email = emailElement.value
  const passwordElement = document.getElementById(
    'password'
  ) as HTMLInputElement
  const password = passwordElement.value
  localStorage.setItem('email', email)
  localStorage.setItem('password', password)
}

const removeData = () => {
  localStorage.setItem('email', '')
  localStorage.setItem('password', '')
}

const loadData = () => {
  const emailInput = document.getElementById('email') as HTMLInputElement
  const password = document.getElementById('password') as HTMLInputElement
  const checkbox = document.getElementById('checkbox') as HTMLInputElement
  if (emailInput) emailInput.value = localStorage.getItem('email') || ''
  if (password) password.value = localStorage.getItem('password') || ''
  if (checkbox) checkbox.checked = localStorage.getItem('checkbox') === 'true'
}

const shakeButton = () => {
  const button = document.getElementById('submit') as HTMLButtonElement
  button?.classList.add('shake')
  setTimeout(() => button?.classList.remove('shake'), 300)
}

window.onload = () => {
  loadData()
}

document.getElementById('checkbox')?.addEventListener('change', (event) => {
  const checkbox = event.target as HTMLInputElement
  localStorage.setItem('checkbox', checkbox.checked.toString())
  if (!checkbox.checked) removeData()
})

document.getElementById('submit')?.addEventListener('click', (event) => {
  event.preventDefault()
  const checkbox = document.getElementById('checkbox') as HTMLInputElement
  const isSessionSaved = checkbox.checked
  if (validateForm()) {
    const isAccepted = check()

    if (isAccepted && isSessionSaved) {
      saveData()
    }
  } else {
    shakeButton()
  }
})
