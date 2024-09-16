const express = require("express")
const productoRouter = require("./producto.router");
const compraRouter = require("./compra.router");
const authRouter = require("./auth.router");

function routerApi(app) {
    const router = express.Router()
    app.use("/api", router)
    router.use("/producto", productoRouter)
    router.use("/usuario", authRouter)
    router.use("/compra", compraRouter)
}

module.exports = routerApi