# 🚀 Guia de Instalação - Estudos-On

## Pré-requisitos

- **Node.js** (v14 ou superior) - [Download](https://nodejs.org/)
- **npm** (vem com Node.js)
- **Git**

## Passo 1: Clone o Repositório

```bash
git clone https://github.com/Lucasclouds/Estudos-on.git
cd Estudos-on
```

## Passo 2: Instale as Dependências

```bash
npm install
```

Isso vai instalar:
- `express` - Framework web
- `bcryptjs` - Encriptação de senhas
- `jsonwebtoken` - Autenticação JWT
- `cors` - Controle de acesso
- `dotenv` - Variáveis de ambiente

## Passo 3: Configure o Arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```
PORT=3000
NODE_ENV=development
JWT_SECRET=ASLDLUC@SF+§SecureStudyPlatform2024
DB_TYPE=json
```

## Passo 4: Gerar Hash da Senha

Se quiser adicionar novos usuários com senha diferente, execute no terminal Node.js:

```bash
node
```

Dentro do Node:

```javascript
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync('sua-senha-aqui', 10));
```

Copie o hash e adicione em `src/config/users.config.js`

## Passo 5: Inicie o Servidor

```bash
npm start
```

Você verá:

```
🚀 Servidor rodando em http://localhost:3000
```

## Passo 6: Acesse a Plataforma

Abra seu navegador e vá para:

```
http://localhost:3000
```

## 📝 Credenciais de Teste

### Usuário: admin
**Senha:** `ASLDLUC@SF+§`

### Usuário: aluno2
**Senha:** `ASLDLUC@SF+§`

### Usuário: aluno3
**Senha:** `ASLDLUC@SF+§`

## 🔐 Segurança - Pontos Importantes

✅ **Senhas não são visíveis no Inspector**
- Todas as senhas são enviadas com hash bcrypt
- Nenhuma senha é armazenada em texto plano

✅ **Token JWT para Autenticação**
- Expira em 24 horas
- Não contém a senha

✅ **CORS Habilitado**
- Requisições apenas do seu domínio

## 📁 Estrutura de Arquivos

```
Estudos-on/
├── public/
│   ├── index.html          # Login
│   ├── dashboard.html      # Dashboard principal
│   ├── css/
│   │   ├── login.css
│   │   └── dashboard.css
│   └── js/
│       ├── auth.js         # Lógica de autenticação
│       ├── dashboard.js    # Controle do dashboard
│       ├── ranking.js      # Sistema de ranking
│       ├── ai-tutor.js     # IA de tutoria
│       ├── assessments.js  # Sistema de provas
│       └── profile.js      # Perfil do usuário
├── src/
│   ├── config/
│   │   └── users.config.js # Banco de dados de usuários
│   ├── middleware/
│   │   └── auth.middleware.js # Verificação de token
│   └── routes/
│       ├── auth.js         # Rota de login
│       ├── users.js        # Dados do usuário
│       ├── rankings.js     # Ranking
│       ├── assessments.js  # Avaliações
│       └── ai.js           # IA
├── server.js               # Arquivo principal
├── package.json            # Dependências
├── .env                    # Variáveis de ambiente
└── README.md
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- Login com usuário e senha
- Hash bcrypt (senha não visível)
- JWT Token (24h de validade)
- Lembrar usuário

### ✅ Dashboard
- Estatísticas do usuário
- Acesso rápido às funcionalidades
- Progresso semanal

### ✅ Ranking
- Ranking geral de todos os usuários
- Ranking por série/ano
- Sua posição no ranking

### ✅ IA de Tutoria
- Assistente adaptado por série/ano
- Responde perguntas sobre diversos temas
- Abordagem diferenciada para cada nível

### ✅ Sistema de Avaliações
- Provas mensais (20 questões, 30 min)
- Provas bimestrais (40 questões, 60 min)
- Provas semestrais (60 questões, 90 min)
- Provas anuais (100 questões, 120 min)

### ✅ Perfil do Usuário
- Editar email
- Alterar série/ano
- Adicionar biografia
- Ver estatísticas

## 🔧 Desenvolvimento

Para modo de desenvolvimento com reload automático:

```bash
npm run dev
```

(Requer `nodemon` instalado)

## 📚 Níveis de Ensino Suportados

- 1º ano
- 2º ano
- 3º ano
- 1º Médio
- 2º Médio
- 3º Médio
- Faculdade

## 🤖 IA Adaptada por Nível

A IA muda sua abordagem conforme o nível:

- **1º ano:** Didático e visual
- **2º ano:** Exemplos práticos
- **3º ano:** Análise crítica
- **1º Médio:** Conexões temáticas
- **2º Médio:** Preparação ENEM
- **3º Médio:** Revisão e tática de prova
- **Faculdade:** Metodologia científica

## 🐛 Troubleshooting

### "Porta 3000 já está em uso"

Mude a porta no `.env`:

```
PORT=3001
```

### "Erro de conexão ao fazer login"

Certifique-se que:
1. O servidor está rodando (`npm start`)
2. A porta correta está configurada
3. O arquivo `.env` existe

### "Token expirado"

Faça login novamente. O token expira em 24 horas.

## 📞 Suporte

Para dúvidas ou problemas, verifique os logs no console do servidor.

## 📄 Licença

MIT - Sinta-se livre para usar e modificar!

---

**Desenvolvido com ❤️ para melhorar a educação**
