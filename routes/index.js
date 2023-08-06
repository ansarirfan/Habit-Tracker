const express = require('express');

const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');

router.get('/',passport.checkAuthentication,homeController.home);  //route for homepage with check authentication
router.get('/daily',passport.checkAuthentication,homeController.daily);  //route for daily view

router.use('/users',require('./users'));      //redirecting all the routes with 'users'
router.use('/habit',require('./habit'));      //redirecting all the routes with 'habits'

module.exports = router;