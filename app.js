const dotenv =  require('dotenv').config();
const connectDB = require('./config/mongoose.js');  //mongoose setup
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session'); //used for session-cookie
const customMware = require('./config/middleware.js'); //using locally created middleware
//require passport and local startegy that we have set-in
const passport = require('passport');
//require mongostore to store the session-cookie in db
const MongoStore =require('connect-mongo');
const bodyParser = require('body-parser');
const flash = require('connect-flash');  //using this to send flash messages to frontend
const passportLocal = require('./config/passport-local-strategy.js');


const PORT = process.env.PORT || 5000;
const app = express();
 const DATABSAE_URL ="mongodb+srv://ansaripaniyara007:merawork@meraapp.mrriefo.mongodb.net/habit?retryWrites=true&w=majority"


// parse application/form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','ejs'); //setting view engine as ejs
app.set('views', './views');  //setting the path = requirewhich views will be rendered

// database connection
 connectDB(DATABSAE_URL); 

//setting up the session
app.use(session({
    name: 'habitTracker',
    secret: 'timBerners',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*60)
    },

    store: MongoStore.create({  //setup mongostore to save the session-cookie in db
        mongoUrl:DATABSAE_URL,
        // mongoUrl:server,
        autoRemove: 'disabled'
    })
})); 

app.use(passport.initialize());  //initializing passport
app.use(passport.session());     
app.use(passport.setAuthenticatedUser);  //setting data of current authenticated user in 'req.user'
app.use(flash());   //calling flash
app.use(customMware.setFlash);   //using custom middleware to set the flash to locals

app.use(express.static('assets'));    //accesing static files = requireassets folder
app.use(express.urlencoded({extended: true}));  //using parser to read form data
app.use(cookieParser());

app.use('/', require('./routes/index'));   //redirecting all the routes starting with '/' to the routes folder

app.listen(PORT, () =>{
    console.log(`Express server is up and running on port{PORT}`);
   
});



