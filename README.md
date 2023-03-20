# swagger-tutorail-01

# Steps :

1. setup normal nodejs application
- npm init
- npm i express

2. write the normal server code for different methods as you normally do for creating the apis
- 

import express from 'express';

const app = express();
const port = 5001;

app.get('/', (req, res)=>{
    res.send(`<h3>Get Method of the USER API.</h3>`)
});

// getting all users data
let users = [
    {
        "id" : 1,
        "name" : "Sunny Kumar",
        "gender" : "Male"
    },
    {
        "id" : 2,
        "name" : "Sunny Kumar 2",
        "gender" : "Male"
    }
];

app.get('/users', (req, res)=>{
    res.send(users);
});

// posting data
app.post('/users', (req, res)=>{
    const newUser = req.body;
    users.push(newUser);
    res.send(`User wit name ${newUser.name} has been added successfully..`);
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
});

3. for swagger install packages 
- npm i swagger-jsdoc --save
- npm i swagger-ui-express --save

4. import them into the project :
- 
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

5. define options :
- 
const options ={
    definition : {
        openapi : '3.0.0',
        info : {
            title : "Nodejs Express Swagger API Tutorail",
            version : '1.0.0'
        },
        servers : [{
            url : `http://localhost:5001/`
        }]
    },
    apis : ['./index.js']
}

6. use the imported swaggers to use.
- 
const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger-doc', swaggerui.serve, swaggerui.setup(swaggerSpec))


7. Swagger is being live on http://localhost:5001/swagger-doc

# adding first get method swagger doc
-
// defining the swagger
/**
 * @swagger
 * /:
 *  get :
 *      summary : This is the main endpoint of the api
 *      description : This is the description
 *      responses : 
 *              200:
 *                  description : To test the get method
 */

 # get all the users api swagger :
 - 
 /**
 * @swagger
 * /users:
 *      get:
 *          summary : Get all the users from the database
 *          description : To get the all user
 *          responses : 
 *                  200 :
 *                      description : TO GET all the users
 */