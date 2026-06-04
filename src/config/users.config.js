const bcrypt = require('bcryptjs');

// SENHA MESTRA: ASLDLUC@SF+§
// Para gerar novo hash:
// const bcrypt = require('bcryptjs');
// console.log(bcrypt.hashSync('ASLDLUC@SF+§', 10));

const USERS_DB = {
  'admin': {
    email: 'admin@estudos-on.com',
    grade: '1º ano',
    createdAt: new Date('2026-01-01'),
    passwordHash: '$2a$10$Ck/SkuXdxF5YZm9pXK7T1uLlKpxQVpP8mQyJ5xR2qA8C3nJ2kJaWC' // hash da senha: ASLDLUC@SF+§
  },
  'aluno2': {
    email: 'aluno2@estudos-on.com',
    grade: '2º ano',
    createdAt: new Date('2026-02-01'),
    passwordHash: '$2a$10$Ck/SkuXdxF5YZm9pXK7T1uLlKpxQVpP8mQyJ5xR2qA8C3nJ2kJaWC'
  },
  'aluno3': {
    email: 'aluno3@estudos-on.com',
    grade: '1º Médio',
    createdAt: new Date('2026-03-01'),
    passwordHash: '$2a$10$Ck/SkuXdxF5YZm9pXK7T1uLlKpxQVpP8mQyJ5xR2qA8C3nJ2kJaWC'
  }
};

module.exports = { USERS_DB };