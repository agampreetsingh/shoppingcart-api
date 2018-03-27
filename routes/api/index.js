
const route = require('express').Router();
const passport = require('../../auth/passport');

route.use(passport.authenticate('bearer'));

route.use('/products', require('./products'));

module.exports = route;