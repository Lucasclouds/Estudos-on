const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

const aiResponses = {
  '1º ano': {
    topics: ['Português', 'Matemática Básica', 'Ciências', 'História', 'Geografia'],
    approach: 'Didático e visual',
    focus: 'Conceitos fundamentais'
  },
  '2º ano': {
    topics: ['Literatura', 'Álgebra', 'Física', 'História do Brasil', 'Geografia Física'],
    approach: 'Exemplos práticos',
    focus: 'Aplicação de conceitos'
  },
  '3º ano': {
    topics: ['Análise Literária', 'Trigonometria', 'Mecânica', 'Historiografia', 'Geopolítica'],
    approach: 'Análise crítica',
    focus: 'Pensamento complexo'
  },
  '1º Médio': {
    topics: ['Textos Argumentativos', 'Funções', 'Termologia', 'Brasil Colonial', 'Recursos Naturais'],
    approach: 'Conexões temáticas',
    focus: 'Interdisciplinaridade'
  },
  '2º Médio': {
    topics: ['Redação ENEM', 'Logaritmos', 'Eletromagnetismo', 'Brasil Moderno', 'Mudanças Climáticas'],
    approach: 'Preparação para vestibular',
    focus: 'Consolidação de conhecimento'
  },
  '3º Médio': {
    topics: ['ENEM e Vestibular', 'Análise Combinatória', 'Relatividade', 'Brasil Contemporâneo', 'Sustentabilidade'],
    approach: 'Revisão completa e tática de prova',
    focus: 'Aprovação em exames'
  },
  'Faculdade': {
    topics: ['Interpretação de Textos Acadêmicos', 'Cálculo', 'Física Avançada', 'Pesquisa Histórica', 'Análise Ambiental'],
    approach: 'Metodologia científica',
    focus: 'Pensamento acadêmico'
  }
};

// POST - Enviar pergunta para IA
router.post('/ask', authMiddleware, (req, res) => {
  const { question, subject } = req.body;
  const grade = req.user.grade;

  if (!question) {
    return res.status(400).json({ error: 'Pergunta é obrigatória' });
  }

  const aiConfig = aiResponses[grade] || aiResponses['1º ano'];
  const response = generateAIResponse(question, subject, grade, aiConfig);

  res.json({
    success: true,
    question,
    answer: response,
    aiConfig: {
      grade,
      approach: aiConfig.approach,
      focus: aiConfig.focus
    },
    timestamp: new Date()
  });
});

// GET - Obter tópicos sugeridos por série
router.get('/topics/:grade', (req, res) => {
  const { grade } = req.params;
  const config = aiResponses[grade] || aiResponses['1º ano'];

  res.json({
    grade,
    topics: config.topics,
    approach: config.approach,
    focus: config.focus
  });
});

function generateAIResponse(question, subject, grade, config) {
  const responses = {
    '1º ano': `Como assistente de ${grade}, vou explicar de forma simples e visual!\n\n📚 Tema: ${subject || 'Geral'}\n\n✨ Resposta adaptada para ${grade}:\n\nEste é um conceito fundamental. Imagine que...\n\n💡 Dica: Relembre os conceitos básicos para entender melhor.\n\n🎯 Próximo passo: Pratique com exercícios do nível ${grade}!`,
    '2º ano': `Análise do tema para ${grade}:\n\n📖 ${subject || 'Tema'}\n\n✨ Explicação com exemplos práticos:\n\nA partir do que você aprendeu no ano anterior, agora veremos como aplicar...\n\n🔍 Exemplo prático: Em situações reais, isso significa...\n\n📊 Conexão: Veja como isso se relaciona com outras disciplinas.`,
    '3º ano': `Análise crítica para ${grade}:\n\n🧠 ${subject || 'Tema'}\n\n📚 Perspectiva complexa:\n\nConsiderando diferentes visões sobre este tema, podemos argumentar que...\n\n⚖️ Contrapontos: Porém, é importante considerar também...\n\n💼 Aplicação: No mundo real, isso implica em...`,
    '1º Médio': `Abordagem interdisciplinar para ${grade}:\n\n🌍 ${subject || 'Tema'}\n\n🔗 Conexões temáticas:\n\nEste assunto relaciona-se com diversas áreas do conhecimento...\n\n📌 Integração: Como visto em outras disciplinas...\n\n🎓 Aprofundamento: Para entender melhor, estude também...`,
    '2º Médio': `Preparação ENEM para ${grade}:\n\n🎯 ${subject || 'Tema'}\n\n📋 Estratégia de estudo:\n\nEste tópico é frequente em provas de vestibular. Observe os padrões...\n\n🔴 Pegadilhas comuns: Cuidado com...\n\n✅ Dica para prova: Use a estratégia de...`,
    '3º Médio': `Revisão e tática para ${grade}:\n\n🏆 ${subject || 'Tema'}\n\n✅ Consolidação:\n\nVocê deve dominar completamente este conceito para garantir aprovação.\n\n⏱️ Tática de prova: Assim você economiza tempo na prova.\n\n📚 Revisão: Relembre também...`,
    'Faculdade': `Análise acadêmica para ${grade}:\n\n🔬 ${subject || 'Tema'}\n\n📖 Fundamentação teórica:\n\nSegundo os principais autores na área, este conceito sustenta-se em...\n\n🧪 Metodologia: A pesquisa demonstra que...\n\n📝 Referências: Consulte os trabalhos de...`
  };

  return responses[grade] || responses['1º ano'];
}

module.exports = router;