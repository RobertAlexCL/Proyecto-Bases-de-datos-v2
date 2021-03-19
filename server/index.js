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
        "INSERT INTO usuario (id_usuario, contraseña) VALUES ($1, $2)",
        [username, password],
        (err, result) => {
          console.log(err);
        }
      );
    });
  

  app.listen(3003, () => {
    console.log("running server");
  });

