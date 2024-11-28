"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/databaseService.ts
var databaseService_exports = {};
__export(databaseService_exports, {
  executeQuery: () => executeQuery
});
module.exports = __toCommonJS(databaseService_exports);

// src/config/database.ts
var import_knex = __toESM(require("knex"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var db = (0, import_knex.default)({
  client: "oracledb",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});
var database_default = db;

// src/services/databaseService.ts
var executeQuery = async () => {
  const query = `
    SELECT 
        COUNT(tasy.nr_atendimento) AS legado,
        COUNT(api.nr_atendimento) AS api,
        COUNT(tasy.nr_atendimento) - COUNT(api.nr_atendimento) AS diferenca
    FROM (
        -- Total de atendimentos de alta por per\xEDodo no Tasy
        SELECT DISTINCT 
            ap.nr_atendimento
        FROM
            tasy.atendimento_paciente_v ap,
            tasy.sus_laudo_paciente a
        WHERE
            a.dt_cancelamento IS NULL
            AND ie_tipo_atendimento = 1
            AND cd_convenio = 4
            AND a.nr_atendimento (+) = ap.nr_atendimento
            AND TRUNC(dt_alta) BETWEEN TO_DATE('19/11/2024', 'DD/MM/YYYY') AND TO_DATE('20/11/2024', 'DD/MM/YYYY')
            AND dt_alta >= TO_DATE('19/11/2024 06:00:00', 'DD/MM/YYYY HH24:MI:SS')
            AND dt_alta <= TO_DATE('19/11/2024 18:00:00', 'DD/MM/YYYY HH24:MI:SS')
    ) tasy
    LEFT JOIN (
        -- Total de atendimentos na tabela tbl_inm_atendimento
        SELECT DISTINCT 
            nr_atendimento
        FROM 
            tbl_inm_atendimento
        WHERE 
            tp_status <> 'A'
            AND nr_atendimento IN (
                SELECT DISTINCT 
                    ap.nr_atendimento
                FROM
                    tasy.atendimento_paciente_v ap,
                    tasy.sus_laudo_paciente a
                WHERE
                    a.dt_cancelamento IS NULL
                    AND ie_tipo_atendimento = 1
                    AND cd_convenio = 4
                    AND a.nr_atendimento (+) = ap.nr_atendimento
                    AND TRUNC(dt_alta) BETWEEN TO_DATE('19/11/2024', 'DD/MM/YYYY') AND TO_DATE('20/11/2024', 'DD/MM/YYYY')
                    AND dt_alta >= TO_DATE('19/11/2024 06:00:00', 'DD/MM/YYYY HH24:MI:SS')
                    AND dt_alta <= TO_DATE('19/11/2024 18:00:00', 'DD/MM/YYYY HH24:MI:SS')
            )
    ) api 
    ON 
        tasy.nr_atendimento = api.nr_atendimento;
  `;
  try {
    const results = await database_default.raw(query);
    return results;
  } catch (error) {
    console.error("Erro ao executar consulta complexa:", error);
    throw new Error("Erro ao executar consulta complexa");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  executeQuery
});
