// DASHBOARD MAIN SCRIPT

const API_BASE_URL = 'http://localhost:3000/api';
let currentUser = null;
let currentPage = 'home';

// Inicialização
window.addEventListener('load', () => {
  checkAuth();
  loadUserData();
  setupNavigation();
});

// Verificar autenticação
async function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.clear();
      window.location.href = '/';
    }
  } catch (err) {
    console.error('Erro ao verificar token:', err);
  }
}

// Carregar dados do usuário
async function loadUserData() {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    currentUser = JSON.parse(userStr);
    document.getElementById('userName').textContent = currentUser.username;
    document.getElementById('userGrade').textContent = currentUser.grade;
  }
}

// Setup de navegação
function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      switchPage(page);
    });
  });

  document.getElementById('logoutBtn').addEventListener('click', logout);
}

// Trocar página
function switchPage(pageName) {
  // Remover ativo de todos os itens de navegação
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Adicionar ativo ao clicado
  document.querySelector(`[data-page="${pageName}"]`)?.classList.add('active');

  // Esconder todas as páginas
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // Mostrar página selecionada
  const pageElement = document.getElementById(`${pageName}-page`);
  if (pageElement) {
    pageElement.style.display = 'block';
    currentPage = pageName;
    updatePageTitle(pageName);

    // Carregar dados específicos da página
    if (pageName === 'ranking') loadRanking('general');
    if (pageName === 'ai-tutor') setupAITutor();
    if (pageName === 'assessments') loadAssessments();
    if (pageName === 'profile') loadProfileData();
  }
}

// Atualizar título da página
function updatePageTitle(page) {
  const titles = {
    'home': '🏠 Início',
    'ranking': '🏆 Ranking',
    'ai-tutor': '🤖 IA Tutor',
    'assessments': '📝 Avaliações',
    'profile': '👤 Meu Perfil'
  };
  document.getElementById('pageTitle').textContent = titles[page] || 'Página';
}

// Logout
function logout() {
  if (confirm('Tem certeza que deseja sair?')) {
    localStorage.clear();
    window.location.href = '/';
  }
}

// Funções de página específicas
function loadRanking(type) {
  // Ver ranking.js
}

function setupAITutor() {
  // Ver ai-tutor.js
}

function loadAssessments() {
  // Ver assessments.js
}

function loadProfileData() {
  // Ver profile.js
}