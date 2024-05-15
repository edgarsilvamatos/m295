const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

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

app.use(express.json())

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});