import React, { useEffect, useState } from 'react'
import { validateForm, checkCredentials } from '@/modules/module'
import { Checkbox } from '@/components/CheckBox'
import { SocialAuth } from '@/components/SocialsAuth'
import { Message } from '@/components/Message'
import { useAuthStore } from '@/store/authStore'

export const AuthForm = () => {
  const {
    email,
    password,
    rememberMe,
    message,
    messageType,
    setEmail,
    setPassword,
    setRememberMe,
    setMessage,
    saveCredentials,
    loadCredentials,
    clearCredentials,
  } = useAuthStore()
  const [shakeButton, setShakeButton] = useState(false)

  useEffect(() => {
    loadCredentials()
  }, [loadCredentials])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationResult = validateForm(email, password)

    if (!validationResult.isValid) {
      setMessage(validationResult.message, validationResult.type || 'error')
      setShakeButton(true)
      setTimeout(() => setShakeButton(false), 300)
      return
    }

    const authResult = checkCredentials(email, password)
    setMessage(
      authResult.message,
      authResult.type || (authResult.isValid ? 'success' : 'error')
    )

    if (authResult.isValid && rememberMe) {
      saveCredentials()
    } else if (!authResult.isValid) {
      setShakeButton(true)
      setTimeout(() => setShakeButton(false), 300)
    }
  }

  return (
    <div className="auth__container">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <input
          className="login_input"
          id="email"
          type="email"
          placeholder="Введите электронную почту"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login_input"
          id="password"
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-actions">
          <button
            id="submit"
            type="submit"
            className={shakeButton ? 'shake' : ''}
          >
            Войти
          </button>
          <Checkbox
            id="checkbox"
            checked={rememberMe}
            onChange={(e) => {
              setRememberMe(e.target.checked)
              if (!e.target.checked) clearCredentials()
            }}
            label="Сохранить сессию"
          />
        </div>
        <SocialAuth />
        <Message text={message} type={messageType} />
      </form>
    </div>
  )
}
