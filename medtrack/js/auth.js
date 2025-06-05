// Dados iniciais de usuário (em produção isso viria do backend)
const defaultUser = {
    username: '123456000',
    password: 'MedTrack2025',
    name: 'Administrador',
    role: 'admin'
};

// Inicializa o localStorage com o usuário padrão se não existir
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([defaultUser]));
}

// Função para validar o formulário de login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'pharmacy.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

// Registro de novo usuário
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const register = document.getElementById('reg-register').value;
    const role = document.getElementById('reg-role').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Validações
    if (password.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres!');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    if (!validateRegisterNumber(register, role)) {
        alert('Número de registro inválido para a função selecionada!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verifica se o usuário já existe
    if (users.some(u => u.username === register)) {
        alert('Este número de registro já está cadastrado!');
        return;
    }

    // Cria novo usuário
    const newUser = {
        username: register,
        password: password,
        name: name,
        role: role,
        email: email
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso! Você já pode fazer login.');
    window.location.href = 'index.html';
});

// Função para validar número de registro baseado na função
function validateRegisterNumber(register, role) {
    if (role === 'nurse') {
        // COREN: 6 dígitos
        return /^\d{6}$/.test(register);
    } else if (role === 'pharmacist') {
        // CRF: 5 dígitos
        return /^\d{5}$/.test(register);
    }
    return false;
}

// Verifica se o usuário está logado ao carregar outras páginas
window.addEventListener('DOMContentLoaded', () => {
    const publicPages = ['index.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!publicPages.includes(currentPage)) {
        if (!localStorage.getItem('loggedIn')) {
            window.location.href = 'index.html';
        } else {
            // Atualiza o nome do usuário no cabeçalho se estiver logado
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            const headerElement = document.querySelector('header h1');
            if (headerElement && currentUser.name) {
                headerElement.textContent = `MedTrack - ${currentUser.name}`;
            }
        }
    }
});

// Função de logout
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}