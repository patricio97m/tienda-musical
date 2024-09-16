import request from "supertest";
import { expect } from "chai";
import app from "../app-test.js";

let server;
let productoAEliminar;

before((done) => {
  server = app.listen(0, () => {
    done();
  });
});

after(() => {
  server.close();
});

describe("POST /producto", () => {
  it("debería crear un nuevo producto", (done) => {
    const nuevoProducto = {
      nombre: "Guitarra Acústica",
      descripcion: "guitarra acústica fender",
      precio: 1000.0,
      categoria: "Cuerdas",
      imagen: "url-de-la-imagen",
    };

    request(app)
      .post("/api/producto")
      .send(nuevoProducto)
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys(
          "id",
          "nombre",
          "descripcion",
          "precio",
          "imagen",
          "categoria"
        );
        expect(res.body.nombre).to.equal(nuevoProducto.nombre);
        productoAEliminar = res.body.id;
        done();
      });
  });
});

describe("GET /producto", () => {
  it("debería retornar una lista de productos", (done) => {
    request(app)
      .get("/api/producto")
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET /producto/cantidad/:id", () => {
  it("debería retornar 3 productos", (done) => {
    request(app)
      .get("/api/producto/cantidad/3")
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.be.lengthOf(3);
        done();
      });
  });
});

describe("GET /producto/:id", () => {
  it("debería retornar un producto", (done) => {
    request(app)
      .get("/api/producto/1")
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.an("object");
        done();
      });
  });
});

describe("GET /producto?nombre='nombreDelProducto'", () => {
  it("debería retornar productos según su nombre", (done) => {
    request(app)
      .get("/api/producto?nombre=guitarra acústica")
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.an("object");
        expect(res.body).to.be.lengthOf(2);
        done();
      });
  });
});

describe("GET /producto?categoria='categoríaDelProducto'", () => {
  it("debería retornar productos según su categoría", (done) => {
    request(app)
      .get("/api/producto?categoria=Amplificadores")
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.an("object");
        expect(res.body).to.be.lengthOf(1);
        done();
      });
  });
});

describe("PUT /producto", () => {
  it("debería modificar un producto", (done) => {
    const productoModificado = {
      nombre: "Bajo Acústico",
    };

    request(app)
      .put(`/api/producto/${productoAEliminar}`)
      .send(productoModificado)
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys(
          "id",
          "nombre",
          "descripcion",
          "precio",
          "imagen"
        );
        expect(res.body.nombre).to.equal(productoModificado.nombre);
        done();
      });
  });
});

describe("DELETE /producto", () => {
  it("debería eliminar un producto", (done) => {
    request(app)
      .delete(`/api/producto/${productoAEliminar}`)
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
