import { check } from './module';

document.body.innerHTML = `
  <input type="email" id="email" value="" />
  <input type="password" id="password" value="" />
  <div id="message"></div>
`;

describe('check', () => {
  it('должен возвращать true и отображать приветственное сообщение', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@test.ru';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = 'easyPassword1234567890';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = check(emailInput, passwordInput, messageElement);
    expect(result).toBe(true);
    expect(messageElement.textContent).toBe('Добро пожаловать!');
  });

  it('должен возвращать false и выводить сообщение об ошибке для неправильного email', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@example.com';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = 'easyPassword1234567890';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = check(emailInput, passwordInput, messageElement);
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Неверный логин или пароль');
  });

  it('должен возвращать false и выводить сообщение об ошибке при неправильном пароле', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@test.ru';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123456';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = check(emailInput, passwordInput, messageElement);
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Неверный логин или пароль');
  });
});