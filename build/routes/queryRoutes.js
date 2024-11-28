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

// src/routes/queryRoutes.ts
var queryRoutes_exports = {};
__export(queryRoutes_exports, {
  default: () => queryRoutes_default
});
module.exports = __toCommonJS(queryRoutes_exports);
var import_express = require("express");

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

// src/services/emailService.ts
var import_nodemailer = __toESM(require("nodemailer"));
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
var transporter = import_nodemailer.default.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
var sendEmail = async (to, subject, body) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Comparativo dos Antendimento enviados",
      text: body
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new Error("Erro ao enviar e-mail");
  }
};

// src/controllers/queryController.ts
var handleComplexQueryAndEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "O e-mail \xE9 obrigat\xF3rio!" });
    return;
  }
  try {
    const results = await executeQuery();
    const formattedResults = JSON.stringify(results, null, 2);
    await sendEmail(email, "Resultados da Consulta ", formattedResults);
    res.status(200).json({ message: "Consulta executada e e-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar requisi\xE7\xE3o:", error);
    res.status(500).json({ error: "Erro ao executar a consulta ou enviar o e-mail." });
  }
};

// src/routes/queryRoutes.ts
var router = (0, import_express.Router)();
router.post("/email", handleComplexQueryAndEmail);
var queryRoutes_default = router;
