const express = require("express");
const joi = require("joi");
const router = express.Router();
const controllerCompra = require("../controllers/controllerCompra");
const validationSchema = require("../utils/validationSchema");

router
.post(
  "/",
  validationSchema(
    joi.object({
      usuario: joi.string().required(),
      precioTotal: joi.number().precision(2).required(),
      productos: joi.array().required()
    })
  ),
  controllerCompra.create
)

  .get("/:usuario", controllerCompra.getPorusuario)

module.exports = router;
