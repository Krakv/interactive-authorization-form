const validateForm = () => {
    const emailInput = document.getElementById('email');
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    const passwordMinLength = 6;

    if (!emailInput.checkValidity() || emailInput.value === "") {
        message.textContent = 'Некорректный email';
        return false;
    }
    if (password.length < passwordMinLength) {
        message.textContent = 'Пароль должен быть не менее 6 символов';
        return false;
    }
    message.textContent = "";
    return true;
};

const check = () => {
    const correctEmail = 'idtokmakov@edu.hse.ru';
    const correctPassword = 'difficultpassword2025';
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (email === correctEmail && password === correctPassword) {
        message.textContent = 'Добро пожаловать!';
        return true;
    } else {
        message.textContent = 'Неверный логин или пароль';
        return false;
    }
};

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    if (validateForm()){
        let isAccepted = check();
    }
});