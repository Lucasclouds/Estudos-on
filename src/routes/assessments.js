const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

const assessments = {
  'monthly': { name: 'Mensal', duration: 30, questions: 20 },
  'bimonthly': { name: 'Bimestral', duration: 60, questions: 40 },
  'semester': { name: 'Semestral', duration: 90, questions: 60 },
  'annual': { name: 'Anual', duration: 120, questions: 100 }
};

// GET - Listar avaliações disponíveis
router.get('/available', authMiddleware, (req, res) => {
  res.json(Object.entries(assessments).map(([key, value]) => ({
    id: key,
    ...value
  })));
});

// POST - Iniciar uma avaliação
router.post('/start/:assessmentType', authMiddleware, (req, res) => {
  const { assessmentType } = req.params;

  if (!assessments[assessmentType]) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }

  const assessment = assessments[assessmentType];

  res.json({
    success: true,
    assessmentId: `${req.user.username}-${assessmentType}-${Date.now()}`,
    type: assessmentType,
    name: assessment.name,
    duration: assessment.duration,
    questions: assessment.questions,
    startTime: new Date(),
    endTime: new Date(Date.now() + assessment.duration * 60000)
  });
});

// POST - Enviar respostas da avaliação
router.post('/submit', authMiddleware, (req, res) => {
  const { assessmentId, answers, type } = req.body;

  if (!answers || !type) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  const score = Math.floor(Math.random() * 40) + 60;
  const points = type === 'annual' ? 200 : type === 'semester' ? 150 : type === 'bimonthly' ? 100 : 50;

  res.json({
    success: true,
    score,
    points,
    message: `Avaliação concluída! Você acertou ${score}% das questões e ganhou ${points} pontos!`
  });
});

module.exports = router;