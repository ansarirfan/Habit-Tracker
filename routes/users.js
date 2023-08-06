const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/sign-in',userController.login);           //route for sigh-in
router.get('/sign-out',userController.destroySession); //route for sign-out

router.post('/create',userController.createUser);      //route for creating a new user

//route for creating a session
router.post('/create-session',passport.authenticate('local',{failureRedirect: '/users/sign-in'}),userController.createSession);

module.exports = router