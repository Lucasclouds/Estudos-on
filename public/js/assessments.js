// ASSESSMENTS PAGE SCRIPT

async function loadAssessments() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_BASE_URL}/assessments/available`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      displayAssessments(data);
    }
  } catch (err) {
    console.error('Erro ao carregar avaliações:', err);
  }
}

function displayAssessments(assessments) {
  const grid = document.getElementById('assessmentsGrid');
  grid.innerHTML = '';

  const icons = {
    'monthly': '📅',
    'bimonthly': '📊',
    'semester': '🎓',
    'annual': '🏆'
  };

  assessments.forEach(assessment => {
    const card = document.createElement('div');
    card.className = 'card assessment-card';
    card.innerHTML = `
      <div class="assessment-icon">${icons[assessment.id] || '📝'}</div>
      <div class="assessment-name">${assessment.name}</div>
      <div class="assessment-info">
        <p>⏱️ ${assessment.duration} minutos</p>
        <p>📝 ${assessment.questions} questões</p>
      </div>
      <button class="btn-start" onclick="startAssessment('${assessment.id}')">Iniciar Prova</button>
    `;
    grid.appendChild(card);
  });
}

async function startAssessment(assessmentType) {
  const token = localStorage.getItem('token');
  
  if (!confirm('Você deseja iniciar esta avaliação? Certifique-se de que tem tempo disponível.')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/assessments/start/${assessmentType}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Avaliação iniciada!\n\nTipo: ${data.name}\nDuração: ${data.duration} minutos\nQuestões: ${data.questions}\n\nVocê tem até ${new Date(data.endTime).toLocaleTimeString()} para terminar.`);
      // Em um sistema real, redirecionar para página de prova
    } else {
      alert('Erro ao iniciar avaliação');
    }
  } catch (err) {
    console.error('Erro:', err);
    alert('Erro de conexão');
  }
}