const sqlite3 = require('sqlite3').verbose();

class Database
{

    /**
     * Constructs the database object and opens the connection to the DB.
     * 
     * @param {String} path The path to the SQLite database file. 
     */
    constructor(path)
    {
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err)
                console.log("Error occured during DB boot.");
            else {
                console.log("DB up and running !");
                this.initialize();
            }
                
        });
    }


    /**
     * Initializes the DB by creating the tables if they don't exist.
     */
    initialize()
    {
        let initUser = `CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(30) UNIQUE NOT NULL,
            firstname VARCHAR(30) NOT NULL,
            lastname VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(500) NOT NULL
        );`;
        this.db.run(initUser, () => console.log("User table set"));
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
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO users VALUES('${username}', '${firstname}', '${lastname}', '${email}', '${password}');`
            this.db.run(sql, (err) => {
                if (err)
                    reject(err.message);
                resolve(this.lastID);
            });
        });
    }


    /**
     * Checks if the username given in parameter already exists.
     * 
     * @param {String} username The username to search.
     * 
     * @returns A promise which resolves in the rowid corresponding to the username if it exists, in undefined if it doesn't exist and in error otherwise.
     */
    existUsername(username)
    {
        return new Promise((resolve, reject) => {
            let sql = `SELECT rowid FROM users WHERE username = '${username}';`;
            this.db.get(sql, (err, row) => {
                if (err)
                    reject(err.message);
                else if (row)
                    resolve(row.rowid);
                else
                    resolve(undefined);
            })
        });
    }


    /**
     * Deletes the user identified by username from the database.
     * 
     * @param {int} id The rowid of the user to delete.
     * 
     * @returns A promise which resolves in void if the deletion occured and in error otherwise.
     */
    deleteUser(id)
    {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM users WHERE rowid = '${id}';`;
            this.db.run(sql, (err) => {
                if (err)
                    reject(err.message);
                resolve();
            });
        });
    }


    /**
     * Checks whether the login credentials provided by the users are correct or not.
     * 
     * @param {*} username The username for the account.
     * @param {String} password The hashed password value.
     * 
     * @returns A promise which resolves in the rowid of the user if the login is correct, in undefined if incorrect and in error otherwise.
     */
    checkLoginInformation(username, password)
    {
        // ToDo : Modifier pour prendre en compte BCrypt
        return new Promise((resolve, reject) => {
            let sql = `SELECT rowid FROM users WHERE username = '${username}' AND password = '${password}';`;
            this.db.get(sql, (err, row) => {
                if (err)
                    reject(err.message);
                else if (row)
                    resolve(row.rowid);
                else
                    resolve(undefined);
            })
        });
    }
}

exports.default = Database;