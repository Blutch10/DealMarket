const { json } = require('express');
const session = require('express-session');

class User
{

    constructor(database)
    {
        this.database = database;
    }


    /**
     * Tries to add the user with the information provided in request body.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    addUser(req, res)
    {
        let { username, firstname, lastname, email, password } = req.body;
        if (!username || !firstname || !lastname || !email || !password )
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
            return;
        }
    
        this.addUserSanitizing(username, firstname, lastname, email, password)
            .then((pass) => {
                password = pass;
                this.database.existUsername(username)
                    .then((val) => {
                    if (val)
                        res.status(409).json({
                            status: 409,
                            message: "Username already taken"
                        });
                    else
                    {
                        this.database.addUser(username, firstname, lastname, email, password)
                            .then((val) => {
                                res.status(201).json({
                                    status: 201,
                                    message: "Account created"
                                });
                            })
                            .catch((err) => {
                                console.log(err);   // DEBUG
                                res.status(500).json({
                                    status: 500,
                                    message: "Database error"
                                });
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);   // DEBUG
                    res.status(500).json({
                        status: 500,
                        message: "Database error"
                    });
                });
            })
            .catch((errCode) => {
                if (errCode === -1)
                    res.status(400).json({
                        status: 400,
                        message: "Invalid character used in username, lastname or firstname"
                    });
                else
                    res.status(400).json({
                        status: 400,
                        message: "The provided email is invalid"
                    });
            });
    }


    /**
     * Deletes the account of the currently logged user.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    deleteUser(req, res)
    {
        let id = req.session.userid;
        if (!id) // If the user is not logged in
        {
            res.status(401).json({
                status: 401,
                message: "Operation needs to be logged in"
            });
            return;
        }
        this.database.deleteUser(id)
            .then((val) => {
                if (val === true) 
                {
                    req.session.destroy((err) => {
                        if (err)
                            console.log(err);   //DEBUG
                    });
                    res.status(200).json({
                        status: 200,
                        message: "Account deleted"
                    });
                }
                else
                res.status(400).json({
                    status: 200,
                    message: "Account doesn't exist"
                });
            })
            .catch((err) => {
                console.log(err);   // DEBUG
                res.status(500).json({
                    status: 500,
                    message: "Database error"
                });
            });
    }


    /**
     * Tries to log in the user.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    login(req, res)
    {
        let { username, password } = req.body;
        if (!username || !password)
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
        }

        password = this.sanitizePassword(password);
        this.database.checkLoginInformation(username, password)
            .then((val) => {
                if (val)
                {
                    req.session.regenerate(function (err) {
                        if (err)
                            res.status(500).json({
                                status: 500,
                                message: "Internal error"
                            });
                        else {
                            req.session.userid = val;
                            res.status(200).json({
                                status: 200,
                                message: "Successful authentication"
                            });
                        }
                    }); 
                }
                else
                {
                    req.session.destroy((err) => { });
                    res.status(200).json({
                        status: 200,
                        message: "Failed authentication"
                    });
                }
            })
            .catch((err) => {
                console.log(err);   // DEBUG
                res.status(500).json({
                    status: 500,
                    message: "Database error"
                });
            });
    }


    /**
     * Destroys the session of the user.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    logout(req, res)
    {
        req.session.userid = null;
        req.session.destroy((err) => { 
            if (err)
                res.status(500).json({
                    status: 500,
                    message: "Server internal error"
                });
            else {
                res.status(200).json({
                    status: 200,
                    message: "Successful logout"
                });
                
            }
        });
    }

    /**
     * Updates the password of the user.
     * @param {Request} req the user's request.
     * @param {Response} res the user's response.
     */
    updatePassword(req, res)
    {
        let userid = req.session.userid;
        if (! userid)
        {
            res.status(401).json({
                status: 401,
                message: "Operation needs to be logged in"
            });
            return;
        }

        let {  oldPassword, newPassword } = req.body;
        if (! oldPassword || !newPassword)
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
            return;
        }

        oldPassword = this.sanitizePassword(oldPassword);
        this.database.changePassword(userid, oldPassword, newPassword)
            .then((val) => {
                if (val)
                {
                    res.status(200).json({
                        status: 200,
                        message: "Password changed"
                    });
                }
                else if (val === false)
                {
                    res.status(500).json({
                        status: 500,
                        message: "Couldn't update the password"
                    })
                }
                else if (val === undefined)
                {
                    res.status(400).json({
                        status: 400,
                        message: "The user doesn't exist"
                    })
                }
            })
            .catch((err) => {
                console.log(err);   // DEBUG
                res.status(500).json({
                    status: 500,
                    message: "Server internal error"
                });
            });
    }


    /**
     * Retrieves the last n operations of the user.
     * @param {Request} req The user's request.
     * @param {Response} res The user's response.
     */
    getLastOperations(req, res)
    {
        let userid = req.session.userid;
        if (! userid)
        {
            res.status(401).json({
                status: 401,
                message: "Operation needs to be logged in"
            });
            return;
        }

        this.database.getLastOperations(userid)
            .then((val) => {
                if (val === undefined)
                    res.status(400).json({
                        status: 400,
                        message: "The user doesn't exist"
                    });
                else
                    res.status(200).json({
                        status: 200,
                        message: "History retrieved",
                        ops: val
                    });
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    message: "Server internal error"
                });
            });
    }


    /**
     * Retrieves thue user's account info.
     * @param {Request} req The user's request.
     * @param {Response} res The server's response.
     */
    getAccountInfos(req, res)
    {
        let userid = req.session.userid;
        if (! userid)
        {
            res.status(401).json({
                status: 401,
                message: "Operation needs to be logged in"
            });
            return;
        }

        this.database.getAccountInfos(userid)
            .then((val) => {
                if (val === undefined)
                    res.status(400).json({
                        status: 400,
                        message: "The user doesn't exist"
                    });
                else
                    res.status(200).json({
                        status: 200,
                        message: "Infos retrieved",
                        infos: val
                    });
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    message: "Server internal error"
                });
            });
    }


    /**
     * Checks if the username, the lastname or the firstname do not include unwanted characters.
     * @param {String} username The username.
     * @param {String} lastname The user's lastname.
     * @param {String} firstname The user's firstname.
     * @returns true if everything is ok, false if an unwanted character is spotted.
     */
    checkNames(username, lastname, firstname)
    {
        let specialCharacters = "${}:/\\\"[]=()&#§!?*`£^¨;,<>°";
        for (let i = 0; i < username.length; i++)
            if (specialCharacters.includes(username[i]))
                return false;

        for (let i = 0; i < lastname.length; i++)
            if (specialCharacters.includes(lastname[i]))
                return false;

        for (let i = 0; i < firstname.length; i++)
            if (specialCharacters.includes(firstname[i]))
                return false;
        return true;
    }


    /**
     * Checks whether an email adress is valid or not.
     * @param {String} email The user's email.
     * @returns true if the email is valid, false otherwise.
     */
    checkEmail(email)
    {
        let invalidCharacters = "${}:/\\\"[]=()&#§!?*`£^¨;,<>¨°"
        for (let i = 0; i < email.length; i++)
            if (invalidCharacters.includes(email[i]))
                return false;

        if (!email.includes("@") || !email.includes("."))
            return false;
        return true;
    }


    /**
     * Replaces special characters in the password.
     * @param {String} password The user's plaintext password.
     * @returns The modified password.
     */
    sanitizePassword(password)
    {
        let specialCharacters = "${}:/\\\"[]=()&#§!?*`£^¨;,<>°";

        for (let i = 0; i < password.length; i++)
                if (specialCharacters.includes(password[i]))
                {
                    let change = password.charCodeAt(i).toString();
                    password = password.slice(0, i) + change + password.slice(i + 1);
                }
        return password;
    }


    /**
     * Used in addUser method to check the validity of the data provided by the user for this method.
     * @param {String} username The username.
     * @param {String} firstname The user's firstname.
     * @param {String} lastname The user's lastname.
     * @param {String} email The user's email.
     * @param {String} password The user's plaintext password.
     * @returns A promise which resolves in the modified password if everything is OK, rejects -1 if one of the names is invalid
     * or -2 if the email is invalid.
     */
    addUserSanitizing(username, firstname, lastname, email, password)
    {
        return new Promise((resolve, reject) => {
            if (!this.checkNames(username, lastname, firstname))
                reject(-1);
            else if (!this.checkEmail(email))
                reject(-2);
            password = this.sanitizePassword(password);
            resolve(password);
        });
    }
}

exports.default = User;