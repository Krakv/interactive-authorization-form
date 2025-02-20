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

const saveData = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
};

const removeData = () => {
    localStorage.setItem('email', "");
    localStorage.setItem('password', "");
};

const loadData = () => {
    document.getElementById('email').value = localStorage.getItem('email') || '';
    document.getElementById('password').value = localStorage.getItem('password') || '';
    document.getElementById('checkbox').checked = localStorage.getItem('checkbox') === 'true';
};

window.onload = () => {
    loadData();
};

document.getElementById('checkbox').addEventListener('change', (event) => {
    localStorage.setItem('checkbox', event.target.checked);
    if (!event.target.checked)
        removeData();
});

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    let isSessionSaved = document.getElementById('checkbox').checked;
    if (validateForm()){
        let isAccepted = check();

        if (isAccepted && isSessionSaved){
            saveData();
        }
    }
});