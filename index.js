//load express
const express = require('express');
const app = express();

//load morgan
const morgan = require('morgan');

//load uuid
const uuid = require ('uuid');

//log request data in terminal
app.use(morgan('common'));

let movies = [
  {
    title: 'Green Mile',
    director: 'Frank Darabont',
    star: 'Tom Hanks',
    year: 2000
  },
  {
    title: 'The Brothers Grimsby',
    director: 'Louis Leterrier',
    star: 'Sascha Baron Cohen',
    year: 2016
  },
  {
    title: 'In the Name of the Father',
    director: 'Jim Sheridan',
    star: 'Daniel day-Lewis',
    year: 1993
  },
  {
    title: 'Ferris Bueller\'s Day Off',
    director: 'John Hughes',
    star: 'Matthew BRoderick',
    year: 1986
  },
  {
    title: 'Drive',
    director: 'Louis Leterrier',
    star: 'Ryan Gosling',
    year: 2011
  },
  {
    title: 'Borat',
    director: 'Larry Charles',
    star: 'Sascha Baron Cohen',
    year: 2006
  },
  {
    title: 'In the Light of the Moon',
    director: 'Leah Welch',
    star: 'Hailee Lipscomb',
    year: 2021
  },
  {
    title: 'The Shining',
    director: 'Stanley Kubrick',
    star: 'Jack Nicholson',
    year: 1980
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    star: 'Al Pacino',
    year: 1972
  },
  {
    title: 'Scent of a Woman',
    director: 'Martin Brest',
    star: 'Al Pacino',
    year: 1992
  }
];

/* ********************* */
/* APP ROUTING */
/* ********************* */

//GET movies JSON data for '/movies' request URL
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});
  
//GET movie data by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found");
  }
});

//GET movie genre data
app.get("/movies/genres/:genre", (req, res) => {
  const genre = movies.find(
    (movie) => movie.genre.name === req.params.genre
  ).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send("Genre does not exist");
  }
});

//GET movie director data
app.get("/movies/directors/:director", (req, res) => {
  const director = movies.find(
    (movie) => movie.director.name === req.params.director
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send("Director not found.");
  }
});

//POST new user (to register)
app.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.userName) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("userName not entered");
  }
});


//PUT nuewUserName (to allow users to update userName)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const newUserName = req.body;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = newUserName.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("User does not exist");
  }
});

//POST new movie to user's account
app.post("/users/:id/:movie", (req, res) => {
  const { id, movie } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.movieFavs.push(movie);
    res.status(200).send(`${movie} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("User does not exist");
  }
});

//DELETE movie from user's account
app.delete("/users/:id/:movie", (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.movieFavs = user.movieFavs.filter((mov) => {
      return mov !== req.params.movie;
    });
    res
      .status(200)
      .send(
        req.params.movie + " was removed from " + user.id + "'s favorites list."
      );
  } else {
    res.status(404).send("User does not exist");
  }
});

//DELETE user by id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => {
      return user.id !== req.params.id;
    });
    res.status(201).send("User " + req.params.id + " was deleted.");
  } else {
    res.status(404).send("User does not exist");
  }
});
  
//serve static files from the public directory
app.use(express.static('public'));

//error handling
app.use((err, req, res, next) => {
console.error(err.stack)
res.status(500).send('Oops, there was an error requesting the page');
});

//listen to port 8080
app.listen(8080, () => {
console.log('Your app is listening on port 8080.');
});