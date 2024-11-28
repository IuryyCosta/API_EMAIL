import { promises } from "dns";
import db_log from "../config/databaselog";

export const setupDatabase = async(): Promise<void> =>{

    const exists = await db_log.schema.hasTable('Logs');

    if(!exists){
        await db_log.schema.createTableIfNotExists('Logs', table => {
            table.increments('id').primary();
            table.string('email').notNullable;
            table.string('message').notNullable
            table.timestamp('created_at').defaultTo(db_log.fn.now());
            console.log('Tabela de logs criada com sucesso!');
        });
    } else {
        console.log('Tabela de logs já existe.');
    }
};