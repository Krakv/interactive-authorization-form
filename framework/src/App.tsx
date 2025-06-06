import { useState, useEffect } from 'react';
import { validateForm, check } from './modules/module';
import './styles/index.css'
import React from 'react'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [shakeButton, setShakeButton] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || '';
    const savedPassword = localStorage.getItem('password') || '';
    const savedCheckbox = localStorage.getItem('checkbox') === 'true';

    setEmail(savedEmail);
    setPassword(savedPassword);
    setRememberMe(savedCheckbox);
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    localStorage.setItem('checkbox', isChecked.toString());

    if (!isChecked) {
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
    }
  };

  const saveData = () => {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tempEmailInput = document.createElement('input');
    tempEmailInput.type = 'email';
    tempEmailInput.value = email;

    const tempPasswordInput = document.createElement('input');
    tempPasswordInput.type = 'password';
    tempPasswordInput.value = password;

    const tempMessageDiv = document.createElement('div');

    if (validateForm(tempEmailInput, tempPasswordInput, tempMessageDiv)) {
      const isAccepted = check(tempEmailInput, tempPasswordInput, tempMessageDiv);
      setMessage(tempMessageDiv.textContent || '');
      setMessageClass(tempMessageDiv.className);

      if (isAccepted && rememberMe) {
        saveData();
      }
    } else {
      setMessage(tempMessageDiv.textContent || '');
      setMessageClass(tempMessageDiv.className);
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 300);
    }
  };

  return (
    <div className="body">
      <header>
        <img
          src="images/Krakv.jpg"
          className="header-logo"
          height="70px"
          title="Лого"
          alt="Logo"
        />
      </header>

      <main>
        <article className="v-main">
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
                <label className="remember-me">
                  <input
                    id="checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                  />
                  Сохранить сессию
                </label>
              </div>
              <div className="auth__socials">
                <img className="socials_icons" id="google" title="google" src="images/google.ico" alt="Google" />
                <img className="socials_icons" id="yandex" title="yandex" src="images/yandex.ico" alt="Yandex" />
                <img className="socials_icons" id="vk" title="vk" src="images/vk.ico" alt="VK" />
                <img className="socials_icons" id="tg" title="tg" src="images/tg.ico" alt="Telegram" />
              </div>
              {message && <div id="message" className={messageClass}>{message}</div>}
            </form>
          </div>
        </article>
      </main>

      <footer>
        <a href="https://github.com/Krakv" style={{fontWeight: 'bold'}}>Автор</a>
      </footer>
    </div>
  );
}

export default App;