const express = require("express");
const joi = require("joi");
const router = express.Router();
const controllerProducto = require("../controllers/controllerProducto");
const validationSchema = require("../utils/validationSchema");

router
  .get("/", controllerProducto.get)

  .get("/:id", controllerProducto.getById)

  .get("/cantidad/:cantidad", controllerProducto.getPorCantidad)

  .post(
    "/",
    validationSchema(
      joi.object({
        nombre: joi.string().min(5).max(50).required(),
        descripcion: joi.string().min(5).max(200).required(),
        precio: joi.number().min(1).required(),
        categoria: joi.string().min(3).max(50).required(),
        imagen: joi.string().max(200).required(),
      })
    ),
    controllerProducto.create
  )

  .put(
    "/:id",
    validationSchema(
      joi.object({
        nombre: joi.string().min(5).max(50),
        descripcion: joi.string().min(5).max(200),
        precio: joi.number().min(1),
        categoria: joi.string().min(3).max(50),
        imagen: joi.string().max(200),
      })
    ),
    controllerProducto.update
  )

  .delete("/:id", controllerProducto._delete);

module.exports = router;
