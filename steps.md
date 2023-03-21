# steps to add swagger documentation to any nodejs api project

1. setup nodejs application

- npm init
- crate index.js file

2. install libraries for the same
- npm i express
- npm i swagger-jsdoc
- npm i swagger-ui-express

3. create the instances of them
- const app = express()
- app.use(express.json());
- const port = 5000
- app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});

4. create a get method api

app.get('/', (req, res)=>{
    res.send("welcome to swagger nodejs with express tutorial");
});

5. now write the definition for swagger

const options = {
    definition : {
        openapi : '3.0.3',
        info : {
            title : 'nodejs api project swagger tutorial',
            version : '1.0.0'
        },
        servers : [
            {
               url : `http://localhost${port}/`
            }
        ]
    },
    apis : ['./index.js'] //api file path
};


6. create instance for swagger setup :

const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger-doc', swaggerui.serve, swaggerui.setup(swaggerSpec));

7 go to localhost:port/swagger-doc on browser you can see your swagger there

- step one succssfull

# Leve 01 code : (working fine)

// importing libraries
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

// makig instances of libraries
const app = express()
app.use(express.json());
const port = 5000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

// creating GET method
app.get('/', (req, res)=>{
    res.send("welcome to swagger nodejs with express tutorial");
});

// swagger documentation for method 1
/**
 * @swagger
 * /:
 *  get:
 *      summary : This api is used to check if GET method is working or not
 *      description : Same Lorem epsum
 *      responses :
 *          200:
 *              description : To test GET method
 */


const options = {
    definition : {
        openapi : '3.0.3',
        info : {
            title : 'nodejs api project swagger tutorial',
            version : '1.0.0'
        },
        servers : [
            {
               url : `http://localhost:${port}/`
            }
        ]
    },
    apis : ['./index.js'] //api file path
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger-doc', swaggerui.serve, swaggerui.setup(swaggerSpec));

# Level 2 code :
// importing libraries
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

// makig instances of libraries
const app = express()
app.use(express.json());
const port = 5000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

// creating GET method
app.get('/', (req, res)=>{
    res.send("welcome to swagger nodejs with express tutorial");
});

// METHOD 1 SWAGGER
// swagger documentation for method 1
/**
 * @swagger
 * /:
 *  get:
 *      summary : This api is used to check if GET method is working or not
 *      description : Same Lorem epsum
 *      responses :
 *          200:
 *              description : To test GET method
 */

// creating another ger method 
let books = [
    {
        id : 1,
        title : "Book 1"
    },
    {
        id : 2,
        title : "Book 2"
    },
    {
        id : 3,
        title : "Book 3"
    }
]
// creating schema for book
/**
 * @swagger
 *  component:
 *      schemas:
 *          book:
 *              type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      id:
 *                          type: integer
 *                      name:
 *                          type: string
 */

app.get('/api/books', (req, res)=>{
    res.send(books);
});

// METHOD 2 SWAGGER
/**
 * @swagger
 * /api/books:
 *  get:
 *      description: to get all books
 *      summary: to get all books
 *      responses:
 *          200:
 *              description: To get all books 200
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:  
 *                          $ref: '#components/schemas/book'
 *                      
 */



const options = {
    definition : {
        openapi : '3.0.3',
        info : {
            title : 'nodejs api project swagger tutorial',
            version : '1.0.0'
        },
        servers : [
            {
               url : `http://localhost:${port}/`
            }
        ]
    },
    apis : ['./index.js'] //api file path
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger-doc', swaggerui.serve, swaggerui.setup(swaggerSpec))


# level 3 code : Get book by id


/**
 * @swagger
 * tags:
 *   name: users
 *   description: The users managing API
 * /users:
 *   post:
 *     summary: Create a new book
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

 # final steps:

 import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express'

const app = express();
app.use(express.json());

const port = 5000;
app.get('/',(req, res)=>{
    res.send(`<h1>Welcome to the bookstore API (swagger) 😎</h1>`)
});

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
 *                  type: string
 *                  format: date
 *                  description: The date of the book was added
 *          example:
 *            id: def5_re3A
 *            title: The New Turing Omnibus
 *            author: Alexander K. Dewdney
 *            finished: false
 *            createdAt: 2020-03-10T04:05:06.157Z
 */

app.get('/', (req, res)=>{
    req.send(`<h1>The Bookstore API 😎</h1>`)
});

let books = [
    {
        "id":1,
        "title": "Harry Potter & the philospher's stone.",
        "author": "J.K Rolling.",
        "finished": true,
        "cratedAt": "2001"
    },
    {
        "id":2,
        "title": "Harry Potter & Order of Pheonix.",
        "author": "J.K Rolling.",
        "finished": false,
        "cratedAt": "2001"
    },
    {
        "id":3,
        "title": "Harry Potter & half blood prince.",
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