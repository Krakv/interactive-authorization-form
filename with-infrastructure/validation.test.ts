import { validateForm } from './script';

document.body.innerHTML = `
  <input type="email" id="email" value="" />
  <input type="password" id="password" value="" />
  <div id="message"></div>
`;

describe('validateForm', () => {
  it('should return false and display error message for invalid email', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = '';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123456';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = validateForm();
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Некорректный email');
  });

  it('should return false and display error message for password length less than 6', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@example.com';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = validateForm();
    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Пароль должен быть не менее 6 символов');
  });

  it('should return true and clear message for valid form', () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@example.com';
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.value = '123456';
    const messageElement = document.getElementById('message') as HTMLDivElement;

    const result = validateForm();
    expect(result).toBe(true);
    expect(messageElement.textContent).toBe('');
  });
});