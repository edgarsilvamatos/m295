const express = require('express')
const session = require('express-session')
const app = express()
const port = 3002;

app.use(session({
    secret: 'supersecret',
      resave: false,
      saveUninitialized: true,
    cookie: {}
  }))

app.use(express.json());

app.post('/name', (req, res) => {
    const { name } = req.body;
    req.session.name = name;
    res.send('Name saved in session');
  });

app.get('/name', (req, res) => {
    const name = req.session.name;
    res.json({ name: name });
});

app.delete('/name', (req, res) => {
    delete req.session.name;
    res.send('Name deleted from session');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});