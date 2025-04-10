import { check } from './module';

document.body.innerHTML = `
  <input type="email" id="email" value="" />
  <input type="password" id="password" value="" />
  <div id="message"></div>
`;

describe('check', () => {
  it('should return true and display Welcome message', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'idtokmakov@edu.hse.ru';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = 'difficultpassword2025';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = check(emailInput, passwordInput, messageElement);
    expect(result).toBe(true);
    expect(messageElement.textContent).toBe('Добро пожаловать!');
  });

  it('should return false and display error message for wrong email', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@example.com';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = 'difficultpassword2025';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = check(emailInput, passwordInput, messageElement);
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Неверный логин или пароль');
  });

  it('should return false and display error message for wrong password', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'idtokmakov@edu.hse.ru';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123456';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = check(emailInput, passwordInput, messageElement);
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Неверный логин или пароль');
  });
});