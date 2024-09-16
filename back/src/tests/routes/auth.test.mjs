import request from "supertest";
import { expect } from "chai";
import app from "../app-test.js";

let server;

before((done) => {
  server = app.listen(0, () => {
    done();
  });
});

after(() => {
  server.close();
});

describe("POST /usuario/signup", () => {
  it("debería fallar al usar un nombre de usuario existente", (done) => {
    const usuario = {
      username: "patricio.97",
      password: "Admin.12345",
      email: "patricio.97@gmail.com"
    };

    request(app)
      .post("/api/usuario/signup")
      .send(usuario)
      .end((_err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.error.text).to.equal('"User already exists"');
        done();
      });
  });
});

describe("POST /usuario/login", () => {
  it("debería logear un usuario", (done) => {
    const usuario = {
      username: "patricio.97",
      password: "Admin.1234",
    };

    request(app)
      .post("/api/usuario/login")
      .send(usuario)
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("GET /usuario/userInfo", () => {
  it("debería traer el email de un usuario", (done) => {
    request(app)
      .get("/api/usuario/userInfo")
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.email).to.equal("patricio.97@gmail.com");
        done();
      });
  });
});

describe("GET /usuario/getUser", () => {
  it("debería traer datos de un usuario", (done) => {
    request(app)
      .get("/api/usuario/getUser")
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("POST /usuario/logout", () => {
  it("debería desloguear un usuario", (done) => {
    const usuario = {
      username: "patricio.97",
    };

    request(app)
      .post("/api/usuario/logout")
      .send(usuario)
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
