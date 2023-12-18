const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const PORT = 3000;

// DATA
// importuot people masyva
let users = [
  {
    id: 1,
    name: 'Serbentautas',
    town: 'Vilnius',
    isDeleted: false,
  },
  {
    id: 2,
    name: 'Lenteja',
    town: 'Kaunas',
    isDeleted: false,
  },
  {
    id: 3,
    name: 'James',
    town: 'London',
    isDeleted: false,
  },
];

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // for parsing application/json

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// PEOPLE ROUTES
// GET - /api/people - get all
// GET - /api/people/1 - get single
// DELETE - /api/people/1 - Delete single
// PUT - /api/people/1 - Update person
// POST - /api/people - Add new person

// GET /api/users - grazina visus vartotojus
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/users/4 - gets user
app.get('/api/users/:userId', (req, res) => {
  const userId = +req.params.userId;
  // surasti obj su id === userId
  const found = users.find((uObj) => uObj.id === userId);
  // jei neradom
  if (found === undefined) {
    res.status(404).json({
      msg: `user not found with id ${userId}`,
    });
    return;
  }
  res.json(found);
});
// DELETE /api/users/1 - deletes user
app.delete('/api/users/:userId', (req, res) => {
  const userId = +req.params.userId;
  // atfiltruoti users ir grazinti viska isskyrus ta kurio id === userId
  users = users.filter((uObj) => uObj.id !== userId);
  console.log('users ===', users);
  res.json(users);
});

// PUT /api/users/1 - nusiusto ka atnaujinti - grazinta atnaujinta objekta
app.put('/api/users/:userId', (req, res) => {
  // atnaujintas objektas atsiustas gyvena?
  console.log('req.body ===', req.body);

  // surasti useri su id === userId
  const userId = +req.params.userId;
  // surasti obj su id === userId
  const found = users.find((uObj) => uObj.id === userId);
  // jei neradom
  if (found === undefined) {
    res.status(404).json({
      msg: `user not found with id ${userId}`,
    });
    return;
  }
  // atnaujinti jo savybes su gautom is request
  const { town, name } = req.body;
  found.name = name;
  found.town = town;
  res.json(found);
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
// app.listen(PORT);
