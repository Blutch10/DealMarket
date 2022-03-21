const Datastore = require('nedb');

class Database {

    constructor() {
        this.database = new Datastore({filename: './database.db', autoload: true, onload: (err) => {
            if (err)
                console.log(err.message);
            else
                console.log("Database up and running !");
        }});
        this.database.persistence.setAutocompactionInterval(60000); // Compacts the database each parameter milliseconds.
    }


    /**
     * Tries to add a user to the database with the information given in parameter.
     * 
     * @param {String} username The username used for the new account. Must be unique.
     * @param {String} firstname The firstname of the account owner.
     * @param {String} lastname The lastname of the account owner.
     * @param {String} email The email of the account owner.
     * @param {String} password The (hashed) password provided.
     * 
     * @returns A promise which resolves in the new account's ID if successful and in the error otherwise.
     */
     addUser(username, firstname, lastname, email, password)
     {
        let nUser = {
            username_: username,
            firstname_: firstname,
            lastname_: lastname,
            email_: email,
            password_: password
        };

        return new Promise((resolve, reject) => {
            this.database.insert(nUser, (err, newDoc) => {
                if (err)
                    reject(err.message);
                else
                    resolve(newDoc._id)
            });
        });
     }


     /**
     * Checks if the username given in parameter already exists.
     * 
     * @param {String} username The username to search.
     * 
     * @returns A promise which resolves in the _id corresponding to the username if it exists, in undefined if it doesn't exist and in error otherwise.
     */
    existUsername(username)
    {
        return new Promise((resolve, reject) => {
            this.database.find({username_: username}, (err, docs) => {
                if (err)
                    reject(err.message);
                else if (docs.length === 0)
                    resolve(undefined);
                else
                    resolve(docs[0]._id);
            });
        });
    }


    /**
     * Deletes the user identified by username from the database.
     * 
     * @param {String} id The _id of the user to delete.
     * 
     * @returns A promise which resolves in true if the deletion occured, false if it didn't and in error otherwise.
     */
     deleteUser(id)
     {
        return new Promise((resolve, reject) => {
            this.database.remove({_id: id}, {}, (err, numRemoved) => {
                if (err)
                    reject(err.message);
                else if (numRemoved === 1)
                    resolve(true);
                else
                    resolve(false);
            });
        });
     }


     /**
     * Checks whether the login credentials provided by the users are correct or not.
     * 
     * @param {String} username The username for the account.
     * @param {String} password The hashed password value.
     * 
     * @returns A promise which resolves in the _id of the user if the login is correct, in undefined if incorrect and in error otherwise.
     */
    checkLoginInformation(username, password)
    {
        // ToDo : Modifier pour prendre en compte BCrypt
        return new Promise((resolve, reject) => {
            this.database.find({username_: username, password_: password}, (err, docs) => {
                if (err)
                    reject(err.message);
                else if (docs.length === 0)
                    resolve(undefined);
                else
                    resolve(docs[0]._id);
            });
        });
    }

}

exports.default = Database;