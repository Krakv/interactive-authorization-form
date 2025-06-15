import { validateForm } from './module';

document.body.innerHTML = `
  <input type="email" id="email" value="" />
  <input type="password" id="password" value="" />
  <div id="message"></div>
`;

describe('validateForm', () => {
  it('должен возвращать false и выводить сообщение об ошибке для недопустимого email', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = '';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123456';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = validateForm(emailInput, passwordInput, messageElement);
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Некорректный email');
  });

  it('должен возвращать false и выводить сообщение об ошибке при длине пароля менее 6', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@example.com';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = validateForm(emailInput, passwordInput, messageElement);
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Пароль должен быть не менее 6 символов');
  });

  it('должен возвращать true и сообщение для валидной формы', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@example.com';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123456';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = validateForm(emailInput, passwordInput, messageElement);
    expect(result).toBe(true);
    expect(messageElement.textContent).toBe('');
  });
});