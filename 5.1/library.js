const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

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
  app.use(express.json())


app.get('/books', (request, response) => {

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