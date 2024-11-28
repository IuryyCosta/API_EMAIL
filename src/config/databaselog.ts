
import knex from "knex";
import path from "path";

const db_log = knex({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, '../../logs.sqlite'), // Cria ou usa um Arquivo
        },
        useNullAsDefault: true,
})

export default db_log;