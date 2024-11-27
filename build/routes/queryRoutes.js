"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/queryRoutes.ts
var queryRoutes_exports = {};
__export(queryRoutes_exports, {
  default: () => queryRoutes_default
});
module.exports = __toCommonJS(queryRoutes_exports);
var import_express = require("express");

// src/controllers/queryController.ts
var handleComplexQueryAndEmail = async (req, res) => {
  res.json("Funcionou");
};

// src/routes/queryRoutes.ts
var router = (0, import_express.Router)();
router.post("/send-complex-query-results", handleComplexQueryAndEmail);
var queryRoutes_default = router;
