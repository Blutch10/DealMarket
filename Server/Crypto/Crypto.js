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
                    message: "Sever internal error"
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
}

exports.default = Crypto;