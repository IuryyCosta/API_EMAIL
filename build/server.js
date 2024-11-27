"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/app.ts
var import_express2 = __toESM(require("express"));
var import_body_parser = __toESM(require("body-parser"));

// src/routes/queryRoutes.ts
var import_express = require("express");

// src/controllers/queryController.ts
var handleComplexQueryAndEmail = async (req, res) => {
  res.json("Funcionou");
};

// src/routes/queryRoutes.ts
var router = (0, import_express.Router)();
router.post("/send-complex-query-results", handleComplexQueryAndEmail);
var queryRoutes_default = router;

// src/app.ts
var app = (0, import_express2.default)();
app.use(import_body_parser.default.json());
app.use("/api", queryRoutes_default);
var app_default = app;

// src/server.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var PORT = process.env.PORT || 3e3;
app_default.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
