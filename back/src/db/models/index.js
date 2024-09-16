const {Producto, ProductoSchema} = require("./producto.model.js");
const {Compra, CompraSchema} = require("./compra.model.js");

function setupModels(sequelize){
    Producto.init(ProductoSchema, Producto.config(sequelize));
    Compra.init(CompraSchema, Compra.config(sequelize));

}

module.exports = setupModels;