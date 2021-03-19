const express = require("express");
const Pool = require("pg").Pool;
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    port: 5432,
    database: "dbproject01"
  });

  app.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
  
       pool.query(
        "INSERT INTO usuario (id_usuario, contraseña) VALUES (?, ?)",
        [username, password],
        (err, result) => {
          console.log(err);
        }
      );
    });

  app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
  
    pool.query(
      "SELECT * FROM usuario WHERE id_usuario = ? AND contraseña = ?",
      [username, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
          
        if (result.length > 0){
          res.send(result);
        } else {
          res.send({message: "Usuario o contraseña invalidos"});
          
        }
          
      }
    );
  });

  app.listen(3003, () => {
    console.log("running server");
  });

