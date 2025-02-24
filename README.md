
# Fundamentos de Node.js

Esse projeto visa consolidar conhecimentos em node.js com http, streams e manipulação de dados



## Estrutura do Projeto

```
fundamentos-nodejs/
├── .gitignore
├── database.js
├── database.json
├── index.js
├── middlewares/
│   └── json.js
├── package.json
├── routes.js
├── tasks.csv
└── utils/
    └── utils.js
```

### Arquivos e Diretórios

- **.gitignore**: Arquivo que especifica quais arquivos e diretórios devem ser ignorados pelo Git.
- **database.js**: Contém a classe `Database` que gerencia as operações de CRUD (Create, Read, Update, Delete) para as tarefas.
- **database.json**: Arquivo JSON que armazena os dados das tarefas (criado ao iniciar o servidor | carregado na memória caso exista).
- **index.js**: Arquivo principal que inicia o servidor HTTP e define as rotas.
- **middlewares/json.js**: Middleware para processar o corpo das requisições com JSON.
- **package.json**: Arquivo de configuração do npm que lista as dependências e scripts do projeto.
- **routes.js**: Define as rotas da aplicação e seus respectivos handlers/controllers.
- **tasks.csv**: Arquivo CSV contendo tarefas iniciais para importação.
- **utils/utils.js**: Contém funções utilitárias, como `parsingURL` para analisar a URL, definindo parâmetros de rota.

## Deploy

Para iniciar o projeto em produção:

```bash
  npm run start
```
Para iniciar o projeto em desenvolvimento:

```bash
npm rum dev
```


## Documentação da API

#### Retorna algumas ou todas as tarefas

```http
  GET /tasks
```

| Parâmetro de corpo  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | (_Opcional_). Um título para buscar tarefas |
| `description` | `string` | (_Opcional_) Uma descrição para buscar tarefas |

#### Cria uma tarefa

```http
  POST /tasks
```

| Parâmetro de corpo  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | (**Obrigatório**). Um título para tarefa |
| `description` | `string` | (**Obrigatório**) Uma descrição para tarefa |

#### Atualiza uma tarefa

```http
  PUT /tasks/:id
```

| Parâmetro de corpo  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | (_Opcional_). Um título para atualizar |
| `description` | `string` | (_Opcional_) Uma descrição para atualizar |

#### Deleta uma tarefa

```http
  DELETE /tasks/:id
```
#### Atualiza o status de uma tarefa

```http
  PATCH /tasks/:id/complete
```

