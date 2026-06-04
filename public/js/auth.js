// LOGIN PAGE SCRIPT
// Segurança: Nenhuma senha fica visível no Inspector

const API_BASE_URL = 'http://localhost:3000/api';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember').checked;

  // Limpar mensagens
  document.getElementById('errorMessage').style.display = 'none';
  document.getElementById('successMessage').style.display = 'none';

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Salvar token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberedUsername', username);
      }

      // Mostrar sucesso
      showSuccess('Login realizado com sucesso! Redirecionando...');
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else {
      showError(data.error || 'Erro ao fazer login');
    }
  } catch (err) {
    console.error('Erro:', err);
    showError('Erro de conexão. Tente novamente.');
  }
});

function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = '❌ ' + message;
  errorDiv.style.display = 'block';
}

function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  successDiv.textContent = '✅ ' + message;
  successDiv.style.display = 'block';
}

// Verificar se já está logado
window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = '/dashboard';
  }
});

// Pre-fill username se tiver "Lembrar-me" ativado
window.addEventListener('load', () => {
  if (localStorage.getItem('rememberMe') === 'true') {
    const username = localStorage.getItem('rememberedUsername');
    if (username) {
      document.getElementById('username').value = username;
      document.getElementById('remember').checked = true;
    }
  }
});