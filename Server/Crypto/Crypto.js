const { json } = require('express');
const session = require('express-session');

class Crypto
{
    constructor(userDB, cryptoDB)
    {
        this.userDB = userDB;
        this.cryptoDB = cryptoDB;
    }

    
    /**
     * Tries to access the wallet of an authenticated user.
     * @param {Request} req The user's request.
     * @param {Response} res The server's response.
     */
    getWallet(req, res)
    {
        let userid = req.session.userid;
        if (! userid)
        {
            res.status(401).json({
                status: 401,
                message: "Operations needs to be logged in"
            });
            return;
        }

        this.userDB.getWallet(userid)
            .then((wallet) => {
                if (wallet === undefined)
                    res.status(400).json({
                        status: 400,
                        message: "User doesn't exist"
                    });
                else (wallet !== [])
                    res.status(200).json({
                        status: 200,
                        message: "Wallet found",
                        userWallet: wallet
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
     * Enables a client to buy a certain type of coin.
     * @param {Request} req The user's request.
     * @param {Response} res The server response.
     */
    buyCoin(req, res)
    {
        let userid = req.session.userid;
        if (! userid)
        {
            res.status(401).json({
                status: 401,
                message: "Operations needs to be logged in"
            });
            return;
        }

        const { symbol, quantity } = req.body;
        if (! symbol || ! quantity)
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
            return;
        }

        this.userDB.buyCoin(userid, symbol, quantity)
            .then((result) => {
                if (result === undefined)
                    res.status(400).json({
                        status: 400,
                        message: "User doesn't exist"
                    });
                else if (! result)
                    res.status(500).json({
                        status: 500,
                        message: "Operation aborted"
                    });
                else
                    res.status(200).json({
                        status: 200,
                        message: "Operation successful"
                    });
            })
    }


    /**
     * Enables a client to sell a certain type of coin.
     * @param {Request} req The user's request.
     * @param {Response} res The server response.
     */
     sellCoin(req, res)
    {
         let userid = req.session.userid;
         if (! userid)
         {
             res.status(401).json({
                 status: 401,
                 message: "Operations needs to be logged in"
             });
             return;
         }
 
         const { symbol, quantity } = req.body;
         if (! symbol || ! quantity)
         {
             res.status(400).json({
                 status: 400,
                 message: "Invalid form"
             });
             return;
         }
 
         this.userDB.sellCoin(userid, symbol, quantity)
             .then((result) => {
                 if (result === undefined)
                     res.status(400).json({
                         status: 400,
                         message: "User doesn't exist"
                     });
                 else if (! result)
                     res.status(500).json({
                         status: 500,
                         message: "Operation aborted"
                     });
                 else
                     res.status(200).json({
                         status: 200,
                         message: "Operation successful"
                     });
             })
    }

    /**
     * Gets the candle values for a specified symbol.
     * @param {Reques} req The user's request.
     * @param {Response} res The server's response.
     */
    getCandle(req, res)
    {
        const { symbol } = req.body;
        if (! symbol)
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
            return;
        }

        this.cryptoDB.getCandle(symbol)
            .then((val) => {
                if (val !== undefined && val !== [])
                    res.status(200).json({
                        status: 200,
                        message: "Values retrieved",
                        values: val
                    });
                else if (val !== undefined)
                    res.status(200).json({
                        status: 200,
                        message: "No values in history"
                    });
                else
                    res.status(400).json({
                        status: 400,
                        message: "Unknown symbol"
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
     * Retrieves the entie history of candles from API for a single coin.
     * @param {Reques} req The user's request.
     * @param {Response} res The server's response.
     */
    getCandlesSingleCoin(req, res)
    {
        // Prevents non-authenticated user to spam the API.
        let userid = req.session.userid;
        if (! userid)
        {
            res.status(401).json({
                status: 401,
                message: "Operations needs to be logged in"
            });
            return;
        }

        const { symbol } = req.body;
        if (! symbol)
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
            return;
        }

        this.cryptoDB.getCandlesSingleCoin(symbol)
            .then((val) => {
                res.status(200).json({
                    status: 200,
                    message: "Candles retrieved",
                    candles: val
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
     * Gets the instant price for a single symbol.
     * @param {Request} req The user's request.
     * @param {Response} res The server's response.
     */
    getInstantPrice(req, res) 
    {
         // Prevents non-authenticated user to spam the API.
         let userid = req.session.userid;
         if (! userid)
         {
             res.status(401).json({
                 status: 401,
                 message: "Operations needs to be logged in"
             });
             return;
         }

         const { symbol } = req.body;
         if (! symbol)
         {
             res.status(400).json({
                 status: 400,
                 message: "Invalid form"
             });
             return;
         }

         this.cryptoDB.getInstantPrice(symbol)
            .then((val) => {
                res.status(200).json({
                    status: 200,
                    message: "Price retrieved",
                    price: val
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    message: "Server internal error"
                });
            })
    }


    /**
     * Gets the user's wallet value.
     * @param {Request} req The user's request.
     * @param {Response} res The user's response.
     */
    getWalletValue(req, res) 
    {
        let userid = req.session.userid;
         if (! userid)
         {
             res.status(401).json({
                 status: 401,
                 message: "Operations needs to be logged in"
             });
             return;
         }

         const { wallet } = req.body;
         if (! wallet)
         {
             res.status(400).json({
                 status: 400,
                 message: "Invalid form"
             });
             return;
         }

         this.cryptoDB.getWalletValue(wallet)
            .then((val) => {
                res.status(200).json({
                    status: 200,
                    message: "Value retrieved",
                    price: val
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    message: "Server internal error"
                })
            });
    }
}

exports.default = Crypto;