const {Model, DataTypes} = require("sequelize");

const PRODUCTO_TABLE = "producto"

class Producto extends Model {
	static config(sequelize){
		return{
			sequelize,
			tablename: PRODUCTO_TABLE,
			modelName: "Producto",
			timestamps: true
		}	
	}
}

const ProductoSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "nombre"
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "descripcion"
    },
    precio: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        field: "precio"
    },
    categoria: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "categoria"
    },
    imagen: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "imagen"
    }

}

module.exports = {Producto, ProductoSchema};