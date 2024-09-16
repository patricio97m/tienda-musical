const ServicioProducto = require("../services/servicioProducto");
const service = new ServicioProducto();

const create = (req, res) => {
   return service.create(req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).send({ success: false, message: error.message }));
};

const get = (req, res) => {
    if (req.query.nombre) {
        const nombre = req.query.nombre;
        return service.findPorNombre(nombre)
            .then(productos => res.json(productos))
            .catch(error => res.status(500).send(error));
    } 

    if (req.query.categoria) {
        const categoria = req.query.categoria;
        return service.findPorCategoria(categoria)
          .then(productos => res.json(productos))
          .catch(error => res.status(500).send(error));
      } 

    return service.find()
    .then(response => res.json(response))
    .catch(error => res.status(500).send({ success: false, message: error.message }))
    
  };

const getById = (req, res) => {
    const { id } = req.params;
    return service.findOne(id)
        .then(response => res.json(response))
        .catch(error => res.status(500).send({ success: false, message: error.message }));
};

const getPorCantidad = (req, res) => {
    const {cantidad} = req.params;
    return service.findCantidad(cantidad)
        .then(response => res.json(response))
        .catch(error => res.status(500).send({ success: false, message: error.message }));
};

const update = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    return service.update(id, body)
        .then(response => res.json(response))
        .catch(error => res.status(500).send({ success: false, message: error.message }));
};

const _delete = (req, res) => {
    const { id } = req.params;
    return service.delete(id)
        .then(response => res.json(response))
        .catch(error => res.status(500).send({ success: false, message: error.message }));
};

module.exports = {
    create, get, getById, getPorCantidad, update, _delete
};