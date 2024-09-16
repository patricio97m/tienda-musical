const ServicioCompra = require("../services/servicioCompra");
const service = new ServicioCompra();

const create = (req, res) => {
  return service.create(req.body)
    .then(response => res.json(response))
    .catch(error => res.status(500).send({ success: false, message: error.message }));
};

const getPorusuario = (req, res) => {
    const {usuario} = req.params;
    return service.findPorusuario(usuario)
        .then(response => res.json(response))
        .catch(error => res.status(500).send({ success: false, message: error.message }));
};

module.exports = {
  create, getPorusuario
};