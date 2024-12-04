import knex from 'knex';
import dotenv from 'dotenv';
import oracledb from 'oracledb'

dotenv.config();

oracledb.initOracleClient({ libDir: '../opt/oracle/instantclient_21_13' });

const db = knex({
  client: 'oracledb', 
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING, // Ajuste para usar a variável do .env
  },
  pool: {
    min: 2,
    max: 10,
  },
});

export default db;