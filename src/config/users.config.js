const bcrypt = require('bcryptjs');

// IMPORTANTE: Mude estas credenciais para as suas!
// Senha: ASLDLUC@SF+§
const MASTER_PASSWORD_HASH = '$2a$10$YourHashedPasswordHere'; // Gere com: bcrypt.hashSync('ASLDLUC@SF+§', 10)

// Perfis de usuário (usuário:email)
const USERS_DB = {
  'admin': {
    email: 'admin@estudos-on.com',
    grade: '1º ano',
    createdAt: new Date('2026-01-01'),
    passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/UZO' // hash de uma senha padrão
  }
};

// Gerar hash da senha (use no console Node.js)
// const bcrypt = require('bcryptjs');
// console.log(bcrypt.hashSync('ASLDLUC@SF+§', 10));

module.exports = { USERS_DB, MASTER_PASSWORD_HASH };
