import { validateForm, check } from "./module"

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
  const emlElem = document.getElementById('email') as HTMLInputElement
  const pwdElem = document.getElementById('password') as HTMLInputElement
  const msgElem = document.getElementById('message') as HTMLDivElement
  if (validateForm(emlElem, pwdElem, msgElem)) {
    const isAccepted = check(emlElem, pwdElem, msgElem)

    if (isAccepted && isSessionSaved) {
      saveData()
    }
  } else {
    shakeButton()
  }
})