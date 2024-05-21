const express = require('express');
const app = express();
const port = 3002;

app.use(express.json())

const username = 'zli'
const password = 'zli1234'

function authenticate(req, res, next) {
    const { username: reqUsername, password: reqPassword } = req.body;
    if (reqUsername === username && reqPassword === password) {
        next();
    } else {
        res.status(401).send('Unauthorized!'); 
    }
}

app.get('/public', (req, res) => {
    res.send('This is public!')
})

app.get('/private', authenticate, (req, res) => {
    res.send('Access granted!');
})

app.get('/private2', (req, res) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
    } else {
        const credentials = atob(req.headers.authorization.replace('Basic ', '')).split(':');
        if (credentials[0] === "zli" && credentials[1] === "zli1234") {
            res.send("Authorization allowed!");
          } else {
            res.status(401).send('Wrong credentials');
          }
    }
 })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});