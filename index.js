import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express'
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();
app.use(bodyParser.json());

const port = 5000;
app.get('/',(req, res)=>{
    res.send(`<h1>Welcome to the bookstore API (swagger) 😎</h1>`)
});

app.use(cors());
// setting swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Bookstore API",
            version: '1.0.0',
            description: 'This is the simple CRUD API application made with Express and documented with Swagger',
            licence: {
                name: 'MIT',
                url: 'https://spdx.org/licences/MIT.html',
            },
            contact: {
                name: 'Sunny Kumar',
                github: 'https://github.com/gitsunny404'
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`
            },
        ],
    },
    apis: ['./index.js'],
};
    
const specs = swaggerJSDoc(options);

app.use('/swagger', swaggerui.serve, swaggerui.setup(specs, {explorer: true}));

// API MODEL

/**
 * @swagger
 * components:
 *  schemas:
 *      Book:
 *          type: object
 *          required:
 *              - title
 *              - author
 *              - finished
 *          properties:
 *              id: 
 *                  type: string
 *                  description: The auto-generated id of the book
 *              title:
 *                  type: string
 *                  description: The title of your book
 *              author: 
 *                  type: string
 *                  desciption: The book author
 *              createdAt:
 *                  type: Date
 *                  format: date
 *                  description: The date of the book was added
 *          example:
 *            id: 23b7c22d-22e2-427a-b46a-55dad54ff244
 *            title: Harry Potter and the Half bolld prince
 *            author: J.K Rowling
 *            finished: true
 *            createdAt: 1997-03-10T04:05:06.157Z
 */

app.get('/', (req, res)=>{
    req.send(`<h1>The Bookstore API 😎</h1>`)
});

let books = [
    {
        "id":"824a5a1e-066b-4a36-b523-32e796a4b5d1",
        "title": "Harry Potter & the philospher's stone.",
        "author": "J.K Rolling.",
        "finished": true,
        "cratedAt": "2001"
    },
];

app.get('/books', (req, res)=>{
    res.send(books);
});


app.get('/books/:id', (req, res)=>{
    const bookId = req.params.id;
    const findBook = books.find(book => book.id == bookId);
    res.send(findBook);
});

app.post('/books', (req, res)=>{
    const newBook = req.body;
    const uid = uuidv4();
    const dat = new Date();
    newBook.id = uid;
    newBook.cratedAt = dat;
    books.push(newBook);
    res.send(books);
});

app.delete('/books/:id', (req, res)=>{
    const bookid = req.params.id;
    books = books.filter(book => book.id != bookid);
    res.send(books);
});

app.put('/books/:id', (req, res)=>{
    const bookid = req.params.id;
    const findbook = books.find(book => book.id == bookid);
    if(findbook == null){
        res.send(`Book not found for the id ${bookid}`)
    }
    else{
        findbook.title = req.body.title;
        findbook.author = req.body.author;
        findbook.finished = req.body.finished;
        findbook.cratedAt = req.body.cratedAt;
        res.send(books);
    }
});


// Swagger for common paths ie getting everything by ID Methods :
/**
 * @swagger
 * tags:
 *  name: books
 *  desctiption: The book managing API
 * /books:
 * 
 *  get:
 *      summary: Get all books
 *      tags: [books]
 *      responses:
 *          200:
 *              description: The list of all books
 *      content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items: 
 *                      $ref= '#/components/schemas/Book'
 *  post:
 *      summary: Create a new book
 *      tags: [books]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Book'
 *      responses:
 *          200:
 *              description: The created book.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          500:
 *              description: Some server error 
 *    
 * /books/{id}:
 *      get:
 *          summary: Get the book by id
 *          tags: [books]
 *          parameters:
 *               - in: path                    
 *                 name: id
 *                 schema:
 *                    type: string
 *                 required: true
 *                 description: The book id
 *          responses:
 *            200:
 *              description: The book response by id
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *            404:
 *              description: Book not found with the given id
 *      put:
 *          summary: Update the book by the id
 *          tags: [books]
 *          parameters:
 *              - in : path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The book id
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Book'
 *          responses:
 *              200:
 *                  description: The book was updated
 *                  content:
 *                      application/json:
 *                          $ref: '#/components/schemas/Book'
 *              404:
 *                  description: Some error happened
 * 
 *      delete:
 *          summary: Remove the book by id
 *          tags: [books]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The book id
 *          responses: 
 *              200:
 *                  description: The book was deleted successfully
 *              404: 
 *                  description: The book was not found                  
 */


app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
});