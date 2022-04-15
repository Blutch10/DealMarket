const express = require('express');
const session = require('express-session');
const NedbStore = require('connect-nedb-session')(session);
const cors = require('cors');
const UserDatabase = require('./User/UserDatabase').default;
const CryptoDatabase = require('./Crypto/CryptoDatabase').default;
const path = require('path');


const app = express();

app.listen(8080, () => console.log("Server listening on port 8080"));

let userDatabase = new UserDatabase(path.resolve(__dirname, './User/UserDatabase.db'));
exports.userDB = userDatabase;

let cryptoDatabase = new CryptoDatabase(path.resolve(__dirname, './Crypto/CryptoDatabase.db'));
exports.cryptoDB = cryptoDatabase;

/**************
* Middlewares *
***************/
app.use(session(
    {
        secret: "N0tAG00dPractice", 
        resave: false, 
        saveUninitialized: true,
        cookie: {path: '/', httpOnly: true, secure: false, maxAge: 300000},
        store: new NedbStore({ filename: './sessions.db' })
    }
));

app.use(cors()); // Gère les requêtes CORS

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
app.use('/crypto', CryptoRouter);