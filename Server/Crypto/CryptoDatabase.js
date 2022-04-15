const Datastore = require('nedb');

class CryptoDatabase 
{
    constructor(path) 
    {
        this.database = new Datastore({filename: './Crypto/CryptoDatabase.db', autoload: true, onload: (err) => {
            if (err)
                console.log(err.message);
            else
                console.log("CryptoDatabase up and running !");
        }});
        this.database.persistence.setAutocompactionInterval(60000); // Compacts the database each parameter milliseconds.
    }
}

exports.default = CryptoDatabase;