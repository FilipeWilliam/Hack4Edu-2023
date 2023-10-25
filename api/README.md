# Documentação de Rotas

Este arquivo fornece uma visão geral das rotas disponíveis no sistema, juntamente com uma breve descrição do que cada rota faz.

## Autenticação (Auth)

- `POST /auth`
  - Descrição: Autentica um usuário no sistema.

## Recuperação de Senha (Password)

- `POST /password-reset`
  - Descrição: Solicita a redefinição de senha.
  
- `PUT /password-change`
  - Descrição: Altera a senha de um usuário.

## Usuários (Users)

- `POST /users`
  - Descrição: Cria um novo usuário.
  
- `PUT /users/:id`
  - Descrição: Atualiza os detalhes de um usuário existente.
  
- `GET /users`
  - Descrição: Lista todos os usuários no sistema.
  
- `DELETE /users/:id`
  - Descrição: Exclui um usuário do sistema.

## Instituições (Institutions)

- `POST /institutions`
  - Descrição: Cria uma nova instituição.
  
- `PUT /institutions/:id`
  - Descrição: Atualiza os detalhes de uma instituição existente.
  
- `GET /institutions`
  - Descrição: Lista todas as instituições no sistema.
  
- `DELETE /institutions/:id`
  - Descrição: Exclui uma instituição do sistema.

## Disciplinas (Subjects)

- `GET /subjects/:id`
  - Descrição: Retorna detalhes de uma disciplina específica.
  
- `POST /subjects`
  - Descrição: Cria uma nova disciplina.
  
- `PUT /subjects/:id`
  - Descrição: Atualiza os detalhes de uma disciplina existente.

## Tarefas (Tasks)

- `GET /tasks`
  - Descrição: Lista todas as tarefas disponíveis.
  
- `GET /tasks/:id`
  - Descrição: Retorna detalhes de uma tarefa específica.
  
- `POST /tasks`
  - Descrição: Cria uma nova tarefa.

## Perguntas (Questions)

- `POST /tasks/:taskId/questions`
  - Descrição: Adiciona uma nova pergunta a uma tarefa existente.

## Associação de Usuários a Disciplinas (UserSubjects)

- `POST /user-subjects`
  - Descrição: Associa um usuário a uma disciplina.

## Tarefas dos Usuários (UserTasks)

- `GET /user-tasks`
  - Descrição: Lista todas as tarefas associadas a um usuário.

## Respostas de Perguntas por Usuário (UserTaskQuestions)

- `POST /user-task/:userTaskId/questions`
  - Descrição: Adiciona uma resposta a uma pergunta de uma tarefa do usuário.

## Classificação (Ranking)

- `GET /ranking`
  - Descrição: Retorna um ranking de desempenho.