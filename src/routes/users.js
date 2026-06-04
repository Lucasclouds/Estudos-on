const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Dados simulados de usuários
let usersData = {
  admin: {
    username: 'admin',
    email: 'admin@estudos-on.com',
    grade: '1º ano',
    bio: 'Estudante dedicado',
    profilePicture: '👤',
    totalPoints: 1250,
    studyHours: 45,
    averageGrade: 8.5,
    createdAt: new Date('2026-01-01')
  },
  aluno2: {
    username: 'aluno2',
    email: 'aluno2@estudos-on.com',
    grade: '2º ano',
    bio: 'Aprendendo sempre',
    profilePicture: '👤',
    totalPoints: 980,
    studyHours: 38,
    averageGrade: 8.2,
    createdAt: new Date('2026-02-01')
  },
  aluno3: {
    username: 'aluno3',
    email: 'aluno3@estudos-on.com',
    grade: '1º Médio',
    bio: 'Novo desafio',
    profilePicture: '👤',
    totalPoints: 750,
    studyHours: 32,
    averageGrade: 7.8,
    createdAt: new Date('2026-03-01')
  }
};

// GET - Dados do usuário autenticado
router.get('/profile', authMiddleware, (req, res) => {
  const user = usersData[req.user.username];

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json(user);
});

// PUT - Atualizar perfil do usuário
router.put('/profile', authMiddleware, (req, res) => {
  const { email, bio, grade, profilePicture } = req.body;
  const username = req.user.username;

  if (!usersData[username]) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  if (email) usersData[username].email = email;
  if (bio) usersData[username].bio = bio;
  if (grade) usersData[username].grade = grade;
  if (profilePicture) usersData[username].profilePicture = profilePicture;

  res.json({ 
    success: true, 
    message: 'Perfil atualizado com sucesso',
    user: usersData[username]
  });
});

// GET - Estatísticas do usuário
router.get('/stats', authMiddleware, (req, res) => {
  const user = usersData[req.user.username];

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json({
    totalPoints: user.totalPoints,
    studyHours: user.studyHours,
    averageGrade: user.averageGrade,
    rank: calculateRank(user.totalPoints)
  });
});

function calculateRank(points) {
  if (points >= 5000) return 'Mestre';
  if (points >= 3000) return 'Expert';
  if (points >= 1000) return 'Avançado';
  if (points >= 500) return 'Intermediário';
  return 'Iniciante';
}

module.exports = router;