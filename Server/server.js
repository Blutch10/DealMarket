const express = require('express');
const session = require('express-session');
const NedbStore = require('connect-nedb-session')(session);
const cors = require('cors');
const UserDatabase = require('./User/UserDatabase').default;
const CryptoDatabase = require('./Crypto/CryptoDatabase').default;
const cron = require('node-cron');


const app = express();

app.listen(8080, () => console.log("Server listening on port 8080"));

let userDatabase = new UserDatabase();
exports.userDB = userDatabase;

let cryptoDatabase = new CryptoDatabase();
exports.cryptoDB = cryptoDatabase;

/**************
* Middlewares *
***************/
app.use(session(
    {
        secret: "N0tAG00dPractice", 
        resave: false, 
        saveUninitialized: true,
        cookie: {path: '/', httpOnly: true, sameSite: false, secure: false/*, maxAge: 300000*/},
        store: new NedbStore({ filename: './sessions.db' })
    }
));


let corsConfig = {
    "origin": "http://localhost:4200",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
}
app.use(cors(corsConfig)); // Gère les requêtes CORS

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
const UserRouter = require('./User/UserRouter.js');
app.use('/user', UserRouter);

// Crypto routes
const CryptoRouter = require('./Crypto/CryptoRouter');
const { connect } = require('./User/UserRouter.js');
app.use('/crypto', CryptoRouter);


/************
 * Cronjobs *
 ************/

 cron.schedule('0 * * * *', () => {
    this.cryptoDB.updateDatabase();
    console.log('\nCrypto database updated\.n'); // DEBUG
  });