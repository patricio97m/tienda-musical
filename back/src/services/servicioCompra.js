const {models} = require("../lib/sequelize");
const {Sequelize} = require("sequelize");

class ServicioCompra{
    constructor(){}

    async create(compra){
        return await models.Compra.create(compra);
    }

    async findPorusuario(nombreUsuario) {
        return await models.Compra.findAll({
            where: {
                usuario: {
                    [Sequelize.Op.like]: nombreUsuario
                }
            }
        });
    } catch (error) {
        console.error('Error en findPorusuario:', error);
        throw error;
    }
}

module.exports = ServicioCompra;