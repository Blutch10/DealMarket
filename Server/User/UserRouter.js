/**
 * @description This file defines the different routes enabled for the user resource.
 * When a route is hit, a certain method from the User object is called.
 */

const express = require('express');
const database = require('../server.js').userDB;
const User = require('./User.js').default;

const router = express.Router();
router.use(express.json());
let user = new User(database);

// Login
router.post('/login', (req, res) => {
    user.login(req, res);
});

// Logout
router.get('/logout', (req, res) => {
    user.logout(req, res);
});

// Register
router.put('/register', (req, res) => {
    user.addUser(req, res);
});

// Delete account
router.delete('/deleteAccount', (req, res) => {
    user.deleteUser(req, res);
});

// Update password
router.put('/resetPassword', (req, res) => {
    user.updatePassword(req, res);
})

// Get the history of user
router.get('/history', (req, res) => {
    user.getLastOperations(req, res);
});

// Returns the wallet of the use
router.get('/wallet');

router.get('/test', (req, res) => {
    user.test(req, res);
}); // DEBUG

router.get('/infos', (req, res) => {
    user.getAccountInfos(req, res);
});

module.exports = router;