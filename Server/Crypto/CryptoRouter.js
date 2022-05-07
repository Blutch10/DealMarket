/**
 * @description This file defines the different routes enabled for the Crypto resource.
 * When a route is hit, a certain method from the Crypto object is called.
 */

const User = require('../User/User').default;
const Crypto = require('./Crypto').default;
const express = require('express');

let cryptoDatabase = require('../server').cryptoDB;
let userDatabase = require('../server').userDB;

let user = new User(userDatabase);
let crypto = new Crypto(userDatabase, cryptoDatabase);
const router = express.Router();
router.use(express.json());


// Recuperation of user's wallet
router.get('/wallet', (req, res) => {
    crypto.getWallet(req, res);
});

// Buying coins
router.post('/buy', (req, res) => {
    crypto.buyCoin(req, res);
});

// Selling coins
router.post('/sell', (req, res) => {
    crypto.sellCoin(req,res);
});

router.get('/candle', (req, res) => {
    crypto.getCandle(req, res);
});

router.post('/coinCandles', (req, res) => {
    crypto.getCandlesSingleCoin(req, res);
});

module.exports = router;