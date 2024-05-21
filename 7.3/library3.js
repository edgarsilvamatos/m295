const express = require('express');
const session = require('express-session');
const fs = require('fs');
const app = express();
const port = 3002;
const { v4: uuidv4 } = require('uuid');

app.use(express.json())

app.use(session({
    secret: 'supersecret',
      resave: false,
      saveUninitialized: true,
    cookie: {}
  }))

const secretAdminCredentials = { email: "desk@library.example", password: "m295" }

app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'loginForm.html'));
  });

app.post('/login', function (request, response) {
	const { email, password } = request.body

    if (email?.toLowerCase() == secretAdminCredentials.email && password == secretAdminCredentials.password) {
        request.session.email = email
        return response.status(200).json({ email: request.session.email })
    }

  return response.status(401).json({ error: "Invalid credentials" })
})

app.get('/verify', function (request, response) {

	if (request.session.email) {
		return response.status(200).json({ email: request.session.email })
	}

  return response.status(401).json({ error: "Not logged in" })
})

app.delete('/logout', function (request, response) {

	if (request.session.email) {
		request.session.email = null
		return response.status(204).send()
	}

  return response.status(401).json({ error: "Not logged in" })
})

app.listen(3000)

const lends = [
    {
      "id": "db09c92d-be25-4d5c-a380-700a130f501b",
      "customerId": 101,
      "isbn": "978-0061120084",
      "borrowedAt": "2024-05-10",
      "returnedAt": "2024-05-15"
    },
    {
      "id": "86279c55-c9ff-4472-9de5-c41f39f2032e",
      "customerId": 102,
      "isbn": "978-1451673319",
      "borrowedAt": "2024-04-25",
      "returnedAt": null
    },
    {
      "id": "b28fd703-f6cb-4d26-9326-663f23c207b0",
      "customerId": 103,
      "isbn": "978-0679746041",
      "borrowedAt": "2024-05-01",
      "returnedAt": "2024-05-08"
    } 
]

app.get('/lends', (request, response) => {
  response.send(lends)
})

app.get('/lends/:id', (request, response) => {
  response.send(lends.find((lend) => lend.id = request.params.id))
})

app.post('/lends', (request, response) => {
  const newLend = request.body
  const burrowed = lends.find((lend) => lend.isbn === newLend.isbn)
  const customer3 = lends.filter((lend) => lend.customerId === newLend.customerId && !newLend.returnedAt)
  const openLends = customer3.length

  if (!newLend || !newLend.customerId || !newLend.isbn || !newLend.burrowedAt) {
    response.status(422).send('Invalid lend data.')
    return
  }
  if (burrowed) {
    response.status(422).send('Book already burrowed.')
    return
  }
  if (openLends >= 3) {
    response.status(422).send('Customer burrowed more than 3 books.')
    return
  }

  const newLendWithId = {
    id: uuidv4(),
    customerId: newLend.customerId,
    isbn: newLend.isbn,
    burrowedAt: newLend.burrowedAt
  } 

  lends.push(newLendWithId)

  response.status(201).json({
    message: 'Successfully added lend.',
    data: newLendWithId
  })
})

app.delete('/lends/:id', (request, response) => {
  app.use(express.json())

  const lendID = request.params.id

  const foundLend = lends.findIndex(lend => lend.id === lendID)

  if (foundLend === -1) {
    response.status(404).send(`No such Id ${lendID}.`)
    return
  }

  const deleteLend = lends.splice(foundLend, 1)[0];

  response.send(`Lend deleted ${JSON.stringify(deleteLend)}!`)
})


const books = [
    {
      "isbn": "978-0061120084",
      "title": "To Kill a Mockingbird",
      "year": 1960,
      "author": "Harper Lee"
    },
    {
      "isbn": "978-0141439563",
      "title": "1984",
      "year": 1949,
      "author": "George Orwell"
    },
    {
      "isbn": "978-1451673319",
      "title": "Sapiens: A Brief History of Humankind",
      "year": 2011,
      "author": "Yuval Noah Harari"
    },
    {
      "isbn": "978-0735219090",
      "title": "Where the Crawdads Sing",
      "year": 2018,
      "author": "Delia Owens"
    },
    {
      "isbn": "978-0547928210",
      "title": "The Hobbit",
      "year": 1937,
      "author": "J.R.R. Tolkien"
    },
    {
      "isbn": "978-1400032716",
      "title": "The Kite Runner",
      "year": 2003,
      "author": "Khaled Hosseini"
    },
    {
      "isbn": "978-0140449334",
      "title": "Pride and Prejudice",
      "year": 1813,
      "author": "Jane Austen"
    },
    {
      "isbn": "978-0062315007",
      "title": "The Night Circus",
      "year": 2011,
      "author": "Erin Morgenstern"
    },
    {
      "isbn": "978-0307277671",
      "title": "Life of Pi",
      "year": 2001,
      "author": "Yann Martel"
    },
    {
      "isbn": "978-1400031368",
      "title": "The Curious Incident of the Dog in the Night-Time",
      "year": 2003,
      "author": "Mark Haddon"
    },
    {
      "isbn": "978-0385319952",
      "title": "Memoirs of a Geisha",
      "year": 1997,
      "author": "Arthur Golden"
    },
    {
      "isbn": "978-0385474542",
      "title": "In Cold Blood",
      "year": 1966,
      "author": "Truman Capote"
    },
    {
      "isbn": "978-0060512806",
      "title": "The Alchemist",
      "year": 1988,
      "author": "Paulo Coelho"
    },
    {
      "isbn": "978-0385722205",
      "title": "The Namesake",
      "year": 2003,
      "author": "Jhumpa Lahiri"
    },
    {
      "isbn": "978-0679746041",
      "title": "Into the Wild",
      "year": 1996,
      "author": "Jon Krakauer"
    }
  ]

app.get('/books', (request, response) => {

  swagger.tags = ['books']

    fs.readFile(__dirname + '/books.json', 'utf8', (err, data) => {
        if (err) {
            response.status(500).send('Internal Server Error');
            return;
        }

        const jsonData = JSON.parse(data); 
        response.send(jsonData);
    });
});

app.get('/books/:isbn', (request, response) => {
    response.send(books.find((book) => book.isbn === request.params.isbn) )
})

app.post('/books', (request, response) => {
    const newBook = request.body;

    if (!newBook || !newBook.title || !newBook.author || !newBook.isbn) {
        response.status(400).send('Invalid book data. Must provide title, author, and ISBN.');
        return;
    }

    books.push(newBook);

    response.status(201).json({
        message: 'Book added successfully',
        book: newBook
    });
});

app.put('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const updatedBook = request.body;

    const updatedBooks = books.map((book) => {
        if (book.isbn === isbn) {
            return { ...book, ...updatedBook }; 
        } else {
            return book; 
        }
    });

    const foundBook = updatedBooks.find((book) => book.isbn === isbn);

    if (!foundBook) {
        response.status(404).send('Book not found');
    } else {
        response.send(foundBook);
        
        books = updatedBooks;
    }
});

app.delete('/books/:isbn', (request, response) => {
    books.reduce((accumulator, book) => `${accumulator}${book}, `, "")

    response.send('Book deleted!')
})

app.patch('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const updatedBook = request.body;

    const updatedBooks = books.map((book) => {
        if (book.isbn === isbn) {
            return { ...book, ...updatedBook }; 
        } else {
            return book; 
        }
    });

    const foundBook = updatedBooks.find((book) => book.isbn === isbn);

    if (!foundBook) {
        response.status(404).send('Book not found');
    } else {
        response.send(updatedBook);
        
        books = updatedBooks;
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});