// Simulação de login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulação: redireciona para a tela da farmácia se as credenciais estiverem "corretas"
    if (username && password) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'pharmacy.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

// Verifica se o usuário está logado ao carregar outras páginas
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedIn') && !window.location.pathname.includes('index.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = 'index.html';
    }
});