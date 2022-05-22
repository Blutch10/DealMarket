const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const Binance = require('binance-api-node').default

class UserDatabase {

    constructor() {
        this.client = Binance();
        this.database = new Datastore({filename: './User/UserDatabase.db', autoload: true, onload: (err) => {
            if (err)
                console.log(err.message);
            else
                console.log("UserDatabase up and running !");
        }});
        this.database.persistence.setAutocompactionInterval(5000); // Compacts the database each parameter milliseconds.
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
        let database = this.database;
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10)
            .then((hash) => {
                
                let nUser = {
                    username_: username,
                    firstname_: firstname,
                    lastname_: lastname,
                    email_: email,
                    password_: hash,
                    balance_: 2500.0,
                    wallet_: {},
                    operations_: []
                };

                database.insert(nUser, (err, newDoc) => {
                        if (err)
                            reject(err.message);
                        else
                            resolve(newDoc._id);
                });
            })
            .catch((err) => {
                reject(err.message)
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
        return new Promise((resolve, reject) => {
            this.database.find({username_: username}, (err, docs) => {
                if (err)
                    reject(err.message);
                else if (docs.length === 0)
                    resolve(undefined);
                else {
                    let hash = docs[0].password_;
                    bcrypt.compare(password, hash)
                        .then((result) => {
                            if (result === true)
                                resolve(docs[0]._id);
                            resolve(false);
                        })
                        .catch((err) => {
                            reject(err.message);
                        });
                }      
            });
        }); 
    }


    /**
     * Checks the provided password against the one in the database.
     * @param {String} userid the user who wants to check the password.
     * @param {String} password the password in plaintext.
     * @returns A promise which resolves in true if the test is passed, false if not and an
     * error otherwise.
     */
    checkPassword(userid, password)
    {
        return new Promise((resolve, reject) => {
            this.database.find({_id: userid}, (err, doc) => {
                if (err)
                    reject(err.message);
                else if ( ! doc)
                    resolve(undefined);
                else
                {
                    let hash = doc[0].password_;
                    bcrypt.compare(password, hash)
                        .then((result) => {
                            if (result)
                                resolve(true);
                            else
                                resolve(false);
                        })
                        .catch((err) => {
                            reject(err.message);
                        })
                }
            });
        });
    }

    
    /**
     * Updates the user's password after having performed authentication test.
     * @param {String} userid The user's userid in the database.
     * @param {String} oldPassword the old password in plaintext.
     * @param {String} newPassword the new password in plaintext.
     * @returns A promise which resolves in true if the operation was performed
     * successfully, in false if a logical error occured, in undefined if the user doesn't exist
     * and in error otherwise.
     */
    changePassword(userid, oldPassword, newPassword)
    {
        return new Promise((resolve, reject) => {
            this.checkPassword(userid, oldPassword)
                .then((result) => {
                    if (! result)
                        resolve(false);
                    else
                    {
                        bcrypt.hash(newPassword, 10)
                            .then((hash) => {
                                this.database.update({_id: userid}, { $set : {password_: hash} }, (err, numReplaced) => {
                                    if (err)
                                        reject(err.message);
                                    if (numReplaced === 1)
                                        resolve(true);
                                    else
                                        resolve(false);
                                });
                            })
                            .catch((err) => {
                                reject(err.message);
                            })
                    }
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }


    /**
     * Accesses the user's wallet.
     * @param {Strind} userid The user's id.
     * @returns A promise which resolves in undefined if the user doesn't existe, in
     * the wallet if success, and in error otherwise.
     */
    getWallet(userid)
    {
        return new Promise((resolve, reject) => {
            this.database.find({_id: userid}, {wallet_: 1}, (err, doc) => {
                if (err)
                    reject(err.message);
                else if (doc.length === 0)
                    resolve(undefined);
                else {
                    let wallet = doc[0].wallet_;
                    resolve(wallet);
                }
            });
        });
    }

    
    /**
     * Logs a buying or selling operation in the user's profile.
     * @param {String} userid The id of the user performing the operation.
     * @param {String} type_ The type of the operation ("BUY" or "SELL").
     * @param {String} symbol_ The symbol (coin, USDT) of the currency involved.
     * @param {String} quantity_ The amount of coin traded in the operation.
     * @param {Float} balanceVar_ The variation caused to the account balance.
     * @returns A promisewhich reolves in true if the log was updated, false if not and in
     * an error otherwise.
     */
    logTransaction(userid, type_, symbol_, quantity_, balanceVar_)
    {
        return new Promise((resolve, reject) => {
            if (type_ !== "BUY" && type_ !== "SELL")
                resolve(false);
            
            this.database.update({_id: userid}, { $push: { operations_: {type: type_, coin: symbol_, quantity: quantity_, balance_change: balanceVar_, date: new Date()} } }, (err, numUpdated) => {
                if (err)
                    reject(err.message);
                if (numUpdated === 1)
                    resolve(true);
                else
                    resolve(false);
            });
        });
    }


    /**
     * Enables the client to buy a specific type of coin.
     * @param {String} userid the user's id.
     * @param {String} symbol_ the symbol (coin, USDT) to buy.
     * @param {Float} quantity the amount of coin to buy.
     * @returns A promise that resolves in true if successful, in false if not and 
     * in error otherwise.
     */
    buyCoin(userid, symbol_, quantity)
    {
        return new Promise((resolve, reject) => {
            
            if (quantity < 0)
                resolve(false);

            else 
            {
                this.client.prices( {symbol: symbol_} )
                    .then((val) => {
                        let key = Object.keys(val)[0];
                        let price = val[key];
                        this.database.find({_id: userid}, (err, doc) => {
                            if (err)
                                reject(err.message);
                            if(doc.length === 0)
                                resolve(undefined);
                            else 
                            {
                                let balance = doc[0].balance_;
                                let toPay = quantity * price;
                                if (toPay > balance)
                                    resolve(false);
                                
                                else if (doc[0].wallet_[symbol_] === undefined) {
                                    this.logTransaction(userid, "BUY", symbol_, quantity, -toPay)
                                        .then((result) => {
                                            if (result)
                                            {
                                                let newVal = `wallet_.${symbol_}`;
                                                this.database.update({_id: userid}, { $set: { [newVal]: quantity, balance_: (balance - toPay) } }, (err, numReplaced) => {
                                                    if (err)
                                                        reject(err.message);
                                                    if (numReplaced === 1)
                                                        resolve(true);
                                                    else
                                                        resolve(false);
                                                });
                                            }
                                            else
                                                resolve(false);
                                        })
                                        .catch((err) => {
                                            reject(err);
                                        });
                                }
                                else
                                {
                                    this.logTransaction(userid, "BUY", symbol_, quantity, -toPay)
                                        .then((result) => {
                                            let newVal = `wallet_.${symbol_}`;
                                            this.database.update({_id: userid}, { $set: { [newVal]: doc[0].wallet_[symbol_] + quantity, balance_: (balance - toPay) } }, (err, numReplaced) => {
                                                if (err)
                                                    reject(err.message);
                                                if (numReplaced === 1)
                                                    resolve(true);
                                                else
                                                    resolve(false);
                                            });
                                        })
                                        .catch((err) => {
                                            reject(err.message);
                                        });
                                }    
                            }
                        });
                    })
                    .catch((err) => {
                        reject(err.message);
                    });
            }
        });
    }


    /**
     * Enables the client to sell a specific type of coin he owns.
     * @param {String} userid the user's id.
     * @param {String} symbol_ the symbol (coin, USDT) to sell.
     * @param {Float} quantity the amount of coin to sell.
     * @returns A promise that resolves in true if successful, in false if not and 
     * in error otherwise.
     */
    sellCoin(userid, symbol_, quantity)
    {
        return new Promise((resolve, reject) => {
            this.client.prices( {symbol: symbol_} )
            .then((val) => {
                let key = Object.keys(val)[0];
                let price = val[key];
                this.database.find({_id: userid}, (err, doc) => {
                    if (err)
                        reject(err.message);
                    if(doc.length === 0)
                        resolve(undefined);
                    else 
                    {
                       let balance = doc[0].balance_;
                       let coinStock = doc[0].wallet_[symbol_];
                        if (quantity < 0 || quantity > coinStock || coinStock === null || coinStock === undefined)
                           resolve(false);
                        
                        else
                        {
                            let toGain = quantity * price;
                            
                            if (coinStock - quantity === 0) 
                            {
                                this.logTransaction(userid, "SELL", symbol_, quantity, toGain)
                                    .then((result) => {
                                        if (result)
                                        {
                                            let newVal = `wallet_.${symbol_}`;
                                            this.database.update({_id: userid}, { $unset: { [newVal]: true }, $set: { balance_: (balance + toGain) } }, (err, numReplaced) => {
                                                if (err)
                                                    reject(err.message);
                                                if (numReplaced === 1)
                                                    resolve(true);
                                                else
                                                    resolve(false);
                                            });
                                        }
                                        else
                                            resolve(false);
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    });
                            }
                            else
                            {
                                this.logTransaction(userid, "SELL", symbol_, quantity, toGain)
                                    .then((result) => {
                                        let newVal = `wallet_.${symbol_}`;
                                        this.database.update({_id: userid}, { $set: { [newVal]: doc[0].wallet_[symbol_] - quantity, balance_: (balance + toGain) } }, (err, numReplaced) => {
                                            if (err)
                                                reject(err.message);
                                            if (numReplaced === 1)
                                                resolve(true);
                                            else
                                                resolve(false);
                                        });
                                    })
                                    .catch((err) => {
                                        reject(err.message);
                                    });
                            } 
                        }   
                    }
                });
            })
            .catch((err) => {
                reject(err.message);
            });
        });
    }


    /**
     * Returns the operation history for the user.
     * @param {String} userid Tue user's ID.
     * @returns A promise which resolves in an array of operations from latest to oldest, in undefined
     * if the user doesn't exist and in error otherwise.
     */
    getLastOperations(userid)
    {
        return new Promise((resolve, reject) => {
            this.database.find({_id: userid}, {operations_: 1}, (err, doc) => {
                if (err)
                    reject(err);
                if (doc.length === 0)
                    resolve(undefined);
                else
                {
                    let operations = doc[0].operations_;
                    let ops = [];
                    for (let i = 1; i <= operations.length; i++)
                        ops.push(operations[operations.length - i]);
                    
                    resolve(ops);
                }
            });
        });
    }


    /**
     * Get the user's non-critical account info.
     * @param {String} userid The id of the user.
     * @returns A promise which resolves in the array of info if successful, in
     * undefined if the user doesn't exist and in error otherwise.
     */
    getAccountInfos(userid)
    {
        return new Promise((resolve, reject) => {
            this.database.find({_id: userid}, {password_: 0, operations_:0, _id:0}, (err, doc) => {
                if (err)
                    reject(err);
                else if (doc.length !== 1)
                    resolve(undefined);
                else
                    resolve(doc[0]);
            });
        });
    }

}

exports.default = UserDatabase;