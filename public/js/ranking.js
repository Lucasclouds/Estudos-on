// RANKING PAGE SCRIPT

async function loadRanking(type) {
  const token = localStorage.getItem('token');
  
  try {
    let url = `${API_BASE_URL}/rankings/general`;
    
    if (type === 'grade' && currentUser) {
      url = `${API_BASE_URL}/rankings/by-grade/${currentUser.grade}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      displayRanking(data);
    }
  } catch (err) {
    console.error('Erro ao carregar ranking:', err);
  }
}

function displayRanking(data) {
  const tbody = document.getElementById('rankingBody');
  tbody.innerHTML = '';

  data.forEach(user => {
    const isCurrentUser = user.username === currentUser.username;
    const row = document.createElement('tr');
    row.style.backgroundColor = isCurrentUser ? '#f0f0f0' : '';
    row.style.fontWeight = isCurrentUser ? 'bold' : '';
    
    row.innerHTML = `
      <td>${user.rank}${isCurrentUser ? ' 👈' : ''}</td>
      <td>${user.username}</td>
      <td>${user.grade}</td>
      <td>${user.points}</td>
      <td>${user.averageGrade}</td>
    `;
    
    tbody.appendChild(row);
  });

  // Atualizar tabs ativos
  document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.classList.remove('active');
  });
  if (type === 'general') {
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
  } else {
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
  }
}