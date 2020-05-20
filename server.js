const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'facebox'
  }
});

app.use(express.json())
app.use(cors())

// dummy database for now


app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email == database.users[0].email && req.body.password == database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users').insert({
    email: email,
    name: name,
    joined: new Date()
  }).then(console.log)
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  // this is to get the id
  // remembers params from rails
  const { id } = req.params
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(400).json('not found')
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json('not found')
  }
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})