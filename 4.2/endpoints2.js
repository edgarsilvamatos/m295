const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const patchPath = path.join(__dirname, 'people.json');

const names = [
    'Alice', 'Bob', 'Charlie', 'David', 'Eve',
    'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack',
    'Kate', 'Liam', 'Mia', 'Nathan', 'Olivia',
    'Peter', 'Quinn', 'Rachel', 'Sam', 'Tina'
];

app.get('/now', (request, response) => {
    const tz = request.query.tz || 'CET'; 
    const options = {
        timeZone: tz,
        hour12: false, 
        weekday: 'long', 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const formattedDate = new Date().toLocaleString('de-CH', options);

  response.send(formattedDate);
});

app.get('/zli', (request, response) => {
    response.redirect('https://www.zli.ch')
})

app.get('/name', (request, response) => {
    const randomName = names[Math.floor(Math.random() * names.length)];

    response.send(randomName);
});

app.get('/add-name', (request, response) => {
    response.sendFile(path.join(__dirname, 'form.html'));
  });

app.post('/add-name', (request, response) => {
    const { newName } = request.body

    if (newName && newName.trim() !== '') {
        names.push(newName.trim()); 
        response.send(`Added ${newName} to the array.`);
      } else {
        response.status(400).send('Invalid name.');
      }
})

app.delete('/delete-name', (request, response) => {
    const { name } = request.query;
  
    if (typeof name === 'string' && name.trim() !== '') {
      const trimmedName = name.trim();
      const index = names.indexOf(trimmedName);
      if (index !== -1) {
        names.splice(index, 1); 
        response.status(204).send(`Name '${trimmedName}' deleted.`);
      } else {
        response.status(404).send(`Name '${trimmedName}' not found.`);
      }
    } else {
      response.status(400).send('Invalid name.');
    }
  });

app.get('/secret2', (request, response) => {
const authHeader = request.headers['authorization'];

if (authHeader && authHeader === 'Basic aGFja2VyOjEyMzQ=') {
    response.status(200).send('Authorized.');
} else {
    response.status(401).send('Unauthorized.');
}
});
  
app.get('/chuck', async (request, response) => {
    try {
        const { name } = request.query;
        const url = 'https://api.chucknorris.io/jokes/random';

        const chuckResponse = await fetch(url);
        const chuckData = await chuckResponse.json();

        if (chuckResponse.ok) {
            const joke = chuckData.value;
            const modifiedJoke = replaceName(joke, name);

            response.send(modifiedJoke);
        } else {
            response.status(500).send('Failed fetch joke.');
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        response.status(500).send('Internal server error.');
    }
});

function replaceName(joke, name) {
    if (!name || typeof name !== 'string') {
        return joke;
    }

    const modifiedJoke = joke.replace(/Chuck Norris/gi, name);
    return modifiedJoke;
}

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

function readPeopleData() {
    try {
      const data = fs.readFileSync(patchPath);
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading people data:', error);
      return [];
    }
  }

  app.patch('/me', (request, response) => {
    try {
      const newData = request.body; 
      const peopleData = readPeopleData();
  
      const updatedPeople = peopleData.map(person => {
        if (person.name === newData.name) {
          return { ...person, ...newData }; 
        } else {
          return person; 
        }
      });
  
      fs.writeFileSync(patchPath, JSON.stringify(updatedPeople, null, 2));
  
      response.status(200).send('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
      response.status(500).send('Internal server error.');
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});