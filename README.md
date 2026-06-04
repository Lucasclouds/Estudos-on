# Estudos-On 📚

Plataforma de estudos interativa com autenticação segura, ranking, tutoria por IA e sistema de avaliações.

## Recursos

✅ **Autenticação Segura** - Login com hash de senha, não detectável no Inspector
✅ **Dashboard Personalizado** - Visualize seu progresso
✅ **Ranking de Estudos** - Compete com outros alunos
✅ **Modificação de Perfil** - Atualize seus dados
✅ **IA de Tutoria** - Assistente adaptado por série/ano
✅ **Sistema de Provas** - Mensal, bimestral, semestral e anual
✅ **Múltiplos Níveis** - 1º ano até Faculdade

## Tecnologias

- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Node.js + Express
- Segurança: bcryptjs, JWT
- Armazenamento: JSON/Firebase (configurável)

## Estrutura do Projeto

```
Estudos-on/
├── public/
│   ├── index.html (Login)
│   ├── dashboard.html
│   ├── css/
│   ├── js/
│   └── assets/
├── src/
│   ├── config/
│   ├── routes/
│   ├── middleware/
│   └── models/
├── package.json
└── server.js
```

## Como Usar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as credenciais em `config/users.config.js`
4. Inicie o servidor: `npm start`
5. Acesse em http://localhost:3000

---

**Desenvolvido com ❤️ para melhorar a educação**
