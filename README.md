# API de Envio de E-mail

## Descrição
API para envio de e-mails utilizando o Nodemailer. A API permite o envio de e-mails a partir de uma interface HTTP.

## Tecnologias Utilizadas

- **Node.js** com **Express**: Framework para construção da API.
- **Nodemailer**: Biblioteca para envio de e-mails.
- **Knex**: Query builder SQL.
- **SQLite/OracleDB**: Banco de dados para persistência.
- **Typescript**: Para tipagem estática.

## Instalação

https://github.com/GHASConsulting/ENVIO_EMAIL.git


## Documentação

### Instale as dependências:

#### Instale as dependências:
    npm install

####  Para iniciar o servidor em modo de desenvolvimento:

    npm run dev

#### Produção: Para compilar e iniciar o servidor em produção:
    npm run build

## Endpoints

#### Enviar E-mail

* Método: POST
* Caminho: /send-email
* Descrição: Envia um e-mail para o destinatário.
* Exemplo de Requisição:
    ```js
    {
        "to": "destinatario@exemplo.com",

        "subject": "Assunto do E-mail",

        "text": "Corpo do e-mail"
    }

## Resposta:
* Status 200: E-mail enviado com sucesso

* Status 400: Dados inválidos ou erro no envio

## Variáveis de Ambiente
Confira qual banco de dados irá utilizar e adeque as variáveis de ambiente de acordo com ele.

Caso o banco seja Oracle, as variáveis devem ser:

DATABASE_CLIENT

ORACLE_DIR

DB_CONNECTION_STRING

DB_PASSWORD

DB_USER

### Caso o banco seja PostgreSQL, são as seguintes:

DATABASE_CLIENT

DB_CONNECTION_STRING

E por fim, a porta da aplicação, que utiliza a variável PORT.
