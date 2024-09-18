# API Controle de Tarefas

## Descrição

Esta é uma API RESTful desenvolvida com Node.js, TypeScript, Express e MongoDB para gerenciar tarefas (ToDo). A API inclui autenticação e autorização básicas usando JWT e bcrypt, validação de payload com Joi e é projetada para interagir com um banco de dados MongoDB.

## Estrutura do Projeto

- `/src` - Contém o código-fonte do projeto.
- `.env` - Contém variáveis de ambiente.
- `package.json` - Configuração do gerenciador de pacotes.
- `tsconfig.json` - Configuração do TypeScript.
- `README.md` - Documentação do projeto.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/MateusMontan/RBR-TestePratico.git
   ```

2. Vá até o diretório do projeto:
   ```bash
   cd RBR-TestePratico
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o projeto:
   ```bash
   npm start
   ```

5. Execute os testes:
   ```bash
   npm test
   ```

## API

Documentação Swagger: [SwaggerHub API Documentation](https://app.swaggerhub.com/apis-docs/MATEUSINFOCEFETMG/RBR-TestePratico/1.0.0)

## Variáveis de Ambiente

Certifique-se de criar um arquivo `.env` no diretório raiz com as seguintes variáveis:

```bash
MONGO_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=8a6f2b3c4d5e6f7g8h9i08
```
