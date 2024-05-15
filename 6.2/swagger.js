const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Library API',
      description: 'Library API consisting of Books and Lends'
    },
    host: 'localhost:3000',
    tags: [ 
    { name: 'books', description: 'Operations related to books' },
    { name: 'lends', description: 'Operations related to lending books' },
  ],
  };
  
  const outputFile = './swagger.json';
  const routes = ['books.js', 'lends.js'];

  swaggerAutogen(outputFile, routes, doc);