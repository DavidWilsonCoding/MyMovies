//load express
const express = require('express');
const app = express();

//load morgan
const morgan = require('morgan');

//load uuid
const uuid = require('uuid');

//load bodyParser
const bodyParser = require('body-parser');


//load mongoose
const mongoose = require('mongoose');
const Models = require('./models.js');

//import data models
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//log request data in terminal
app.use(morgan('common'));

//allow request body to be parsed
app.use(bodyParser.json());

//serve static files from the public directory
app.use(express.static('public'));

/* ********************* */
/* APP ROUTING */
/* ********************* */

//GET all movies
app.get ('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(200).json(movies);
  })
  .catch((err) => {
    res.status(500).send('Error: ' + err);
  });
});
  
//GET movie data by title
app.get('/movies/:title', (req, res) => {
  //find the movie by title
  Movies.find({ Title: req.params.title}) 
  .then((movie) => {
    //If movie was found, return data, else generate error
    if(movie){
      res.status(200).json(movie);
    } else {
      res.status(400).send('Movie not found');
    };
  })
  .catch((err) => {
    res.status(500).send('Error: '+ err);
  });
});

//GET movie genre data by genre name
app.get('/movies/genres/:Name', (req, res) => {
  console.log('test1');
  //find movie by genre name
  Movies.findOne({ 'Genre.Name': req.params.Name})
    .then((movie) => {
      //if a movie with the genre was found, return genre info, else generate an error
      if(movie){ 
        res.status(200).json(movie.Genre);
      } else {
        res.status(400).send('Genre not found');
      };
    })
    .catch((err) => {
      res.status(500).send('Error: '+ err);
    });
    console.log('test2');
});

//GET movie director data by director name
app.get('/movies/directors/:Name', (req, res) => {
  //find one movie with the director by name
  Movies.findOne({ 'Director.Name': req.params.Name}) 
    .then((movie) => {
      // If a movie with the director was found, return director data, else generate an error
      if(movie){ 
        res.status(200).json(movie.Director);
      } else {
        res.status(400).send('Director not found');
      };
    })
    .catch((err) => {
      res.status(500).send('Error: '+ err);
    });
});

//POST new user (to POST new user to users)
app.post('/users', (req, res) => {
  Users.findOne({Username : req.body.Username})
  .then((user) => {
    //if the Username already exists, genrate an error
    if(user) {
      return res.status(400).send('User with the Username ' + req.body.Username + ' already exists!')
      // If the username is not held in database, create a new user from request body
    } else {
      Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {res.status(201).json(user)})
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        })
      }
    })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//PUT nuewUserName (to allow users to update userName)
app.put('/users/:Username', (req, res) => {
  //find user by existing username
  Users.findOneAndUpdate({ Username : req.params.Username},
    //update user data from request body 
    {$set: {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
      }
    },
    //Use updated object as callback parameter
    { new : true }) 
    .then((updatedUser) => {
        //return json object of updatedUser
        res.json(updatedUser); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//POST new movie to user's FavoriteMovies array
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({Username : req.params.Username}, // Find user by username
    //add movie to FavoriteMovies if not in existing array
    {$addToSet: { FavoriteMovies: req.params.MovieID}},
    //use updated object as callback parameter
    { new : true }) 
    .then((updatedUser) => {
        //return json object of updatedUser
        res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//DELETE movie from user's topFilms array
app.put('/users/:Username/movies/:MovieID', (req, res) => {
  console.log(req.params.MovieID);
  //find user by username
  Users.findOneAndUpdate({Username : req.params.Username}, 
    //remove movie from the list
    {$pull: { FavoriteMovies: req.params.MovieID}}, 
    //use updated object as callback parameter
    { new : true }) 
    .then((updatedUser) => {
        //return json object of updatedUser
        res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//DELETE user from users
app.delete('/users/:Username', (req, res) => {
  //find user by username
  Users.findOneAndRemove({ Username : req.params.Username}) 
    .then((user) => {
      //if user was found, return success message, else return error
      if(user){
        res.status(200).send('User with the Username ' + req.params.Username + ' was sucessfully deleted.');
      } else {
        res.status(400).send('User with the Username ' + req.params.Username + ' was not found.');
      };
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });
  
//error handling
app.use((err, req, res, next) => {
console.error(err.stack)
res.status(500).send('Oops, there was an error requesting the page');
});

//listen to port 8080
app.listen(8080, () => {
console.log('Your app is listening on port 8080.');
});