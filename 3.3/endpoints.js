const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/now', (request, response) => {
  response.send(new Date().toLocaleString());
});

app.get('/zli', (request, response) => {
    response.redirect('https://www.zli.ch')
})

app.get('/name', (request, response) => {
    const names = [
        'Alice', 'Bob', 'Charlie', 'David', 'Eve',
        'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack',
        'Kate', 'Liam', 'Mia', 'Nathan', 'Olivia',
        'Peter', 'Quinn', 'Rachel', 'Sam', 'Tina'
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];

    response.send(randomName);
});

app.get('/html', (request, response) => {
    const htmlPath = path.join(__dirname, 'index.html');
    response.sendFile(htmlPath);
});

app.get('/image', (request, response) => {
    const htmlPath = path.join(__dirname, 'slade.jpg');
    response.sendFile(htmlPath);
});

app.get('/teapot', (request, response) => {
    const status = 418
    response.status(status).send(`Status: ${status}`);
});

app.get('/user-agent', (request, response) => {
    const userAgent = request.headers['user-agent'];

    response.send(`User-Agent: ${userAgent}`);
});

app.get('/secret', (request, response) => {
    const status = 403
    response.status(status).send(`Status: ${status}`);
});

app.get('/xml', (request, response) => {
    const htmlPath = path.join(__dirname, 'index.xml');
    response.sendFile(htmlPath);
});

app.get('/me', (request, response) => {
    const htmlPath = path.join(__dirname, 'people.json');
    response.sendFile(htmlPath);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});