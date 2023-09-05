import express from "express";
import db from './utils/database.js';
import User from '../models/user.models.js';
import "dotenv/config";

//variable del entorno llamada PORT
const PORT = process.env.PORT ?? 8000;

// PROBAR CONECCION CON LA DB
db.authenticate()
    .then(() => {console.log('conexión correcta');
    })
    .catch((err) => console.log(err));

db.sync()
    .then(() => console.log('base de datos sincronizada'))
    .catch((err) => console.log(err));

const app = express ();

app.use(express.json()); // => midleware para leer el body

// HEALTHCHECK
app.get('/', (req, res) => {
    res.send('OK');
})

//CREATE user => Cuando se haga una request a /users POST, crear un usuario

app.post('/users', async (req, res) => {
    try{
        const { body } = req;
    // mandar esta info a la db
    // * INSERT INTO useer (username, email, password)
        const user = await User.create(body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err)
    }

});


//READ users => GET /users; devolver un json con todos los usuarios en la base de datos

app.get('/users', async (req, res) => {
  try{
    const users = await User.findAll();
      res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});


// SELECT * FROM users WHERE id=4;
// GET /users/:id       => Enviar el id con el GET 

app.get('/users/:id', async (req, res) => {
  try{
    const { id } = req.params; // params es un obj {id:4}
    const user = await User.findByPk(id); 
    res.json(user);
  }catch(err) {
    res.status(400).json(err);
  }
});

//UPDATE ====> WHERE id = 5;
// PUT '/users' =>  path params
// la informacion a actualizar por el body

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    // primer objeto es la info
    // segundo objeto es el where
    const user = await User.update(body, {
      where: { id }
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
})

app.delete('/users/:id', async ( req, res) => {
try {
  const { id } = req.params;
  await User.destroy({
    where: { id }
  });
  res.status(204).end() // termina con la petición
} catch (error) {
  res.status(400).json(err);
}
});


app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});


