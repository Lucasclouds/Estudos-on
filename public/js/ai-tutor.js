// AI TUTOR PAGE SCRIPT

let chatHistory = [];

function setupAITutor() {
  if (currentUser) {
    document.getElementById('aiGrade').textContent = currentUser.grade;
    loadAITopics();
  }

  const form = document.getElementById('aiForm');
  form.addEventListener('submit', handleAIQuestion);
}

async function loadAITopics() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_BASE_URL}/ai/topics/${currentUser.grade}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      document.getElementById('aiApproach').textContent = data.approach;
    }
  } catch (err) {
    console.error('Erro ao carregar tópicos:', err);
  }
}

async function handleAIQuestion(e) {
  e.preventDefault();
  
  const question = document.getElementById('aiQuestion').value;
  const subject = document.getElementById('aiSubject').value;
  const token = localStorage.getItem('token');

  if (!question) return;

  // Adicionar mensagem do usuário
  addMessage(question, 'user-message');
  document.getElementById('aiQuestion').value = '';

  try {
    const response = await fetch(`${API_BASE_URL}/ai/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ question, subject })
    });

    const data = await response.json();

    if (response.ok) {
      // Adicionar resposta da IA
      addMessage(data.answer, 'ai-message');
    } else {
      addMessage('Erro ao processar a pergunta.', 'ai-message');
    }
  } catch (err) {
    console.error('Erro:', err);
    addMessage('Erro de conexão. Tente novamente.', 'ai-message');
  }
}

function addMessage(text, className) {
  const messagesDiv = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);
  
  // Scroll para o final
  const chatContainer = document.querySelector('.chat-container');
  chatContainer.scrollTop = chatContainer.scrollHeight;
}