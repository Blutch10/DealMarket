const express = require('express');
const session = require('express-session');
const Database = require('./DataBase').default;
const path = require('path');


const app = express();

app.listen(8080, () => console.log("Server listening on port 8080"));

let database = new Database(path.resolve(__dirname, './database.db'));
module.exports = database;

/**************
* Middlewares *
***************/
app.use(session(
    {
        secret: "N0tAG00dPractice", 
        resave: false, 
        saveUninitialized: true,
        cookie: {path: '/', httpOnly: true, secure: false, maxAge: 300000} 
    }
));



/************
*   Routes  *
*************/

//The next code block is only for debugging purpose (prints requests on Server in console)
const router = express.Router();
router.use(express.json());
router.use((req, res, next) => {
    console.log('API: method %s, path %s', req.method, req.path);
    console.log('Body', req.body);
    next();
});
app.use('/', router);


// User routes
const userRoute = require('./User/UserRouter.js');
app.use('/user', userRoute);