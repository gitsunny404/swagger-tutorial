import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

const app = express();
const port = 5001;

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

const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger-doc', swaggerui.serve, swaggerui.setup(swaggerSpec))

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