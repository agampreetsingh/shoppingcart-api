
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors=require('cors');

const passport = require('./auth/passport');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser('secretsalt'));
app.use(expressSession({
    secret: 'secretsalt',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));
app.use('/', express.static(__dirname + "/public_static"));
const myport=1305;
app.listen(myport, function () {
    console.log("Server started on http://localhost: "+myport);
});