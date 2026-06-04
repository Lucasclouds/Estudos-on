// PROFILE PAGE SCRIPT

async function loadProfileData() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      displayProfileData(data);
    }
  } catch (err) {
    console.error('Erro ao carregar perfil:', err);
  }
}

function displayProfileData(user) {
  document.getElementById('profileEmail').value = user.email;
  document.getElementById('profileGrade').value = user.grade;
  document.getElementById('profileBio').value = user.bio || '';

  const form = document.getElementById('profileForm');
  form.onsubmit = (e) => updateProfile(e, user.username);
}

async function updateProfile(e, username) {
  e.preventDefault();
  
  const token = localStorage.getItem('token');
  const email = document.getElementById('profileEmail').value;
  const grade = document.getElementById('profileGrade').value;
  const bio = document.getElementById('profileBio').value;

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, grade, bio })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Perfil atualizado com sucesso!');
      // Atualizar dados do usuário no localStorage
      currentUser.grade = grade;
      localStorage.setItem('user', JSON.stringify(currentUser));
      document.getElementById('userGrade').textContent = grade;
    } else {
      alert('❌ Erro ao atualizar perfil: ' + data.error);
    }
  } catch (err) {
    console.error('Erro:', err);
    alert('Erro de conexão');
  }
}