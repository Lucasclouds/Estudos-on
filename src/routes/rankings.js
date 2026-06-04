const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

const rankingData = [
  { rank: 1, username: 'admin', points: 1250, grade: '1º ano', averageGrade: 8.5 },
  { rank: 2, username: 'aluno2', points: 980, grade: '2º ano', averageGrade: 8.2 },
  { rank: 3, username: 'aluno3', points: 750, grade: '1º Médio', averageGrade: 7.8 },
  { rank: 4, username: 'aluno4', points: 620, grade: '1º ano', averageGrade: 7.5 },
  { rank: 5, username: 'aluno5', points: 480, grade: '2º Médio', averageGrade: 7.1 }
];

// GET - Ranking geral
router.get('/general', (req, res) => {
  res.json(rankingData);
});

// GET - Ranking por série/ano
router.get('/by-grade/:grade', (req, res) => {
  const { grade } = req.params;
  const filtered = rankingData.filter(user => user.grade === grade);
  res.json(filtered);
});

// GET - Posição do usuário autenticado
router.get('/my-position', authMiddleware, (req, res) => {
  const userRank = rankingData.find(u => u.username === req.user.username);

  if (!userRank) {
    return res.status(404).json({ error: 'Você ainda não está no ranking' });
  }

  res.json(userRank);
});

module.exports = router;