const path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const errorController = require('./Controllers/error');
const User = require('./Models/user');
// const mongoConnect = require('./Utilities/database').mongoConnect;

const MONGODB_URI = 'mongodb+srv://Samrat:5EFUbXqY8Ofqo3JK@cluster0.qjskv.mongodb.net/mln-dashboard';


const app = express();


const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})
const csrfProtection = csrf();

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'images');
    },
    filename:(req, file, cb) => {
        cb(null, new Data().toISOString() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./Routes/admin');
const mlnRoutes = require('./Routes/mln-home');
const authRoutes = require('./Routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({ storage: filestorage, fileFilter: fileFilter }).single('image')
  );
app.use(express.static(path.join(__dirname, 'Public')));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
            req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.use((req, res, next) => {

    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });
  /*

  const express = require('express')
  const request = require('request');
  
  app = express();
  const PORT = 3000;
  
  app.get('/admin', function(req, res) {
      request('http://127.0.0.1:5000/flask', function (error, response, body) {
          console.error('error:', error); // Print the error
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the data received
          res.send(body); //Display the response on the website
        });      
  });
  
  app.listen(PORT, function (){ 
      console.log('Listening on Port 3000');
  });  
*/

//Routers
// /admin = username 
app.use('/admin', adminRoutes);

app.use(mlnRoutes);
app.use(authRoutes);

app.use(errorController.get404);
app.use('/500',errorController.get500);

app.use((error, req, res, next) => {
    res.status(500).render('500', {
      pageTitle: 'Error!',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn
    });
  });
  

mongoose
.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
    console.log('Connected to MongoDB - Default http://localhost:3000/homepage');
})
.catch(err =>{
    console.log(err);
});

/***********/
// const PORT = 3000;
// app.get('/home', function(req, res) {
//   request('http://127.0.0.1:5000/flask', function (error, response, body) {
//       console.error('error:', error); // Print the error
//       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//       console.log('body:', body); // Print the data received
//       res.send(body); //Display the response on the website
//     });      
// });

// app.listen(PORT, function (){ 
//   console.log('Listening on Port 3000');
// });  
/***********/

// mongoose
// .connect(MONGODB_URI)
// .then(result => {
//     app.listen(3001);
//     console.log('Connected to MongoDB - Backup  http://localhost:3001/login');
// })
// .catch(err =>{
//     console.log(err);
// });