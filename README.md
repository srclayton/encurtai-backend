<h1 align="center">Encurtaí</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

---

## Overview

O backend do projeto Encurtaí é responsável por gerenciar as solicitações dos usuários para encurtar URLs e lidar com a lógica de armazenamento e recuperação de dados no banco de dados.

## Funcionalidades

- Enviar URLs longas para serem encurtadas.
- Receber URLs encurtadas como resultado.
- Opção de gerar URLs encurtadas aleatoriamente ou personalizadas.
- Integração com backend para processamento das URLs.

## Tecnologias Utilizadas

- **Fastify**: Framework web rápido e eficiente para Node.js.
- **@fastify/cookie**: Plugin para manipulação de cookies no Fastify.
- **@fastify/cors**: Plugin para habilitar Cross-Origin Resource Sharing (CORS) no Fastify.
- **@fastify/jwt**: Plugin para autenticação baseada em JSON Web Tokens (JWT) no Fastify.
- **@fastify/rate-limit**: Plugin para limitação de taxa de solicitações no Fastify.
- **Prisma**: Biblioteca de acesso a banco de dados que facilita a interação com o banco de dados.

## Instalação

Para executar o backend do projeto, siga os passos abaixo:

1. Certifique-se de ter o Node.js e o npm instalados em seu sistema.
1. Clone o repositório para o seu ambiente local.
1. Navegue até o diretório no terminal.
1. Certifique-se de ter um arquivo `.env` no diretório raiz do projeto, contendo as variáveis de ambiente necessárias. Você pode se basear em um arquivo de exemplo fornecido no repositório.
1. Instale as dependências utilizando o comando:

   ```
   npm install
   ```

1. Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando:

   ```
   npm run dev
   ```

1. O servidor de desenvolvimento estará disponível em http://localhost:5541 por padrão.

