const {Model, DataTypes} = require("sequelize");

const COMPRA_TABLE = "Compra"

class Compra extends Model {
	static config(sequelize){
		return{
			sequelize,
			tableName: COMPRA_TABLE,
			modelName: "Compra",
			timestamps: true
		}	
	}

    static associate(models) {
        this.hasMany(models.Producto);
      }
}

const CompraSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    usuario: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    precioTotal: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    productos: {
      allowNull: false,
      type: DataTypes.JSON,
    },
  };

module.exports = {Compra, CompraSchema};