# Task Manager

Este é um projeto de gerenciamento de tarefas, com funcionalidades de criação, leitura, atualização e exclusão (CRUD). A aplicação possui autenticação e cadastro de usuários, além de uma interface responsiva e intuitiva para gerenciar as tarefas. Este projeto foi desenvolvido com foco na utilização de boas práticas e tecnologias modernas.

## 🌐 Links importantes

> Antes de acessar o deploy do frontend, entre no link do backend para a aplicação voltar a funcionar.
> Pode levar alguns segundos para inicializar devido à suspensão automática da Render

- **Repositório no GitHub:** [https://github.com/Kaduh15/task-manager](https://github.com/Kaduh15/task-manager)
- **Deploy do Frontend (Vercel):** [https://task-manager-rose-zeta.vercel.app/](https://task-manager-rose-zeta.vercel.app/)
- **Deploy do Backend (Render):** [https://task-manager-wysd.onrender.com](https://task-manager-wysd.onrender.com)

## 📦 Stack utilizada

### Backend
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **Zod**
- **JWT** (para autenticação)

### Frontend
- **Next.js**
- **shadcn/ui**
- **Tailwind CSS**
- **React Hook Form**
- **Zod** (para validação)
- **Server Actions (ZSA)**

## 🛠️ Funcionalidades

- Cadastro e autenticação de usuários (usando JWT)
- Criação, leitura, atualização e exclusão de tarefas
- Interface responsiva e intuitiva
- Marcação de tarefas como concluídas
- Validação de formulários com **React Hook Form** e **Zod**

## 📖 Rotas da API

A API possui as seguintes rotas:

### Autenticação
- **POST** `/api/auth/login`: Login do usuário
- **POST** `/api/auth/register`: Cadastro de usuário

### Tarefas
- **GET** `/api/task/`: Listar tarefas
- **POST** `/api/task/`: Criar nova tarefa
- **DELETE** `/api/task/{id}`: Excluir tarefa
- **GET** `/api/task/{id}`: Obter tarefa por ID
- **PUT** `/api/task/{id}`: Atualizar tarefa
- **PUT** `/api/task/{id}/completed`: Marcar tarefa como concluída
- **PUT** `/api/task/{id}/un-completed`: Marcar tarefa como não concluída

Para mais detalhes e testes, a documentação Swagger está disponível em:  
[https://task-manager-wysd.onrender.com/docs](https://task-manager-wysd.onrender.com/docs)

## 🚀 Deploy

O backend foi deployado na **Render** e o frontend na **Vercel**.  
As URLs podem levar alguns segundos para carregar devido à suspensão automática dos servidores quando inativos.

- **Frontend Deploy:** [https://task-manager-rose-zeta.vercel.app/](https://task-manager-rose-zeta.vercel.app/)
- **Backend Deploy:** [https://task-manager-wysd.onrender.com](https://task-manager-wysd.onrender.com)

## 🐳 Rodando localmente com Docker

### Pré-requisitos
- Docker e Docker Compose instalados

### Instruções

1. Clone o projeto:
   ```bash
   git clone https://github.com/Kaduh15/task-manager.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd task-manager
   ```

3. Inicie os containers em modo de produção:
   ```bash
   pnpm compose:up
   ```
   Para rodar em modo de desenvolvimento, utilize:
   ```bash
   pnpm compose:up:dev
   ```

4. Para parar os containers:
   ```bash
   pnpm compose:down
   ```

5. A aplicação estará disponível em `http://localhost:3001` (Frontend) e `http://localhost:3002` (Backend).

## 🧑‍💻 Execução sem Docker

Caso prefira rodar a aplicação sem Docker, siga os passos abaixo:

1. Navegue até a pasta do backend e instale as dependências:
   ```bash
   cd backend
   pnpm install
   ```

2. Faça o mesmo para o frontend:
   ```bash
   cd ../frontend
   pnpm install
   ```

3. Configure as variáveis de ambiente conforme necessário (consultar `.env.example`).

4. Execute ambos os servidores:
   ```bash
   pnpm dev
   ```

## ✨ Considerações finais

Este projeto foi desenvolvido com foco em boas práticas de desenvolvimento, utilizando tecnologias modernas e garantindo uma boa experiência de usuário. Sinta-se à vontade para clonar o repositório e contribuir com melhorias.
