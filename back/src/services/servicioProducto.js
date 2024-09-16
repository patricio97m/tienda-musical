const {models} = require("../lib/sequelize");
const {Sequelize} = require("sequelize");

class ServicioProducto{

    constructor(){}

    async find(){
        return await models.Producto.findAll();
    }

    async findOne(id){
        return await models.Producto.findByPk(id);
    }

    async findCantidad(cantidad){
        cantidad = parseInt(cantidad)
        return await models.Producto.findAll({
            limit: cantidad
          });
    }

    async findPorNombre(nombreProducto) {
        return await models.Producto.findAll({
            where: {
                nombre: {
                    [Sequelize.Op.like]: `%${nombreProducto.toLowerCase()}%`
                }
            }
        });
    } catch (error) {
        console.error('Error en findPorNombre:', error);
        throw error;
    }

    async findPorCategoria(categoria) {
        return await models.Producto.findAll({
            where: {
                categoria: categoria
            }
        });
    } catch (error) {
        console.error('Error en findPorCategoria:', error);
        throw error;
    }

    async create(usuario){
        return await models.Producto.create(usuario);
    }

    async update(id, data){
        const Producto = await this.findOne(id);
        return await Producto.update(data)
    }

    async delete(id){
        const Producto = await this.findOne(id);
        return await Producto.destroy();
    }

}

module.exports = ServicioProducto;