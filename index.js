//load express
const express = require('express');
const app = express();

//load morgan
const morgan = require('morgan');

//load uuid
const uuid = require('uuid');

//load bodyParser
const bodyParser = require('body-parser');

//log request data in terminal
app.use(morgan('common'));

//allow request body to be parsed
app.use(bodyParser.json());

let movies = [
  {
    title: 'Green Mile',
    genre: {
      genreName: "drama",
      genreDesc: "a written work that tells a story through action and speech and is acted out.",
    },
    director: {
      dirName: 'Frank Darabont'
    },    
    star: 'Tom Hanks',
    year: 2000
  },
  {
    title: 'The Brothers Grimsby',
    genre: {
      genreName: "comedy",
      genreDesc: "a genre designed to cause amusement."
    },
    director: {
      dirName: 'Louis Leterrier'
    },
    star: 'Sascha Baron Cohen',
    year: 2016
  },
  {
    title: 'In the Name of the Father',
    genre: {
      genreName: "drama",
      genreDesc: "a written work that tells a story through action and speech and is acted out.",
    },
    director: {
      dirName: 'Jim Sheridan'
    },
    star: 'Daniel Day-Lewis',
    year: 1993
  },
  {
    title: 'Ferris Bueller\'s Day Off',
    genre: {
      genreName: "comedy",
      genreDesc: "a genre designed to cause amusement."
    },
    director: {
      dirName: 'John Hughes'
    },
    star: 'Matthew BRoderick',
    year: 1986
  },
  {
    title: 'Drive',
    genre: {
      genreName: "drama",
      genreDesc: "a written work that tells a story through action and speech and is acted out.",
    },
    director: {
      dirName: 'Louis Leterrier'
    },
    star: 'Ryan Gosling',
    year: 2011
  },
  {
    title: 'Borat',
    genre: {
      genreName: "comedy",
      genreDesc: "a genre designed to cause amusement."
    },
    director: {
      dirName: 'Larry Charles'
    },
    star: 'Sascha Baron Cohen',
    year: 2006
  },
  {
    title: 'In the Light of the Moon',
    genre: {
      genreName: "horror",
      genreDesc: "a story in which the focus is on creating a feeling of fear."
    },
    director: {
      dirName: 'Leah Welch'
    },
    star: 'Hailee Lipscomb',
    year: 2021
  },
  {
    title: 'The Shining',
    genre: {
      genreName: "horror",
      genreDesc: "a story in which the focus is on creating a feeling of fear."
    },
    director: {
      dirName: 'Stanley Kubrick'
    },
    star: 'Jack Nicholson',
    year: 1980
  },
  {
    title: 'The Godfather',
    genre: {
      genreName: "drama",
      genreDesc: "a written work that tells a story through action and speech and is acted out.",
    },
    director: {
      dirName: 'Franics Ford Coppola'
    },
    star: 'Al Pacino',
    year: 1972
  },
  {
    title: 'Scent of a Woman',
    genre: {
      genreName: "drama",
      genreDesc: "a written work that tells a story through action and speech and is acted out.",
    },
    director: {
      dirName: 'Martin Brest'
    },
    star: 'Al Pacino',
    year: 1992
  }
];

let users =  [
  {
    userId: 1,
    userName: 'David',
    email: 'david.wilson.coding@gmail.com',
    password: 'secretPassword',
    birthday: '30/12/1974',
    topFilms: ['Borat', 'Drive']
  }
]

/* ********************* */
/* APP ROUTING */
/* ********************* */

//GET all movies
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
app.get("/movies/genres/:genreName", (req, res) => {
  const genre = movies.find(
    (movie) => movie.genre.genreName === req.params.genreName
  ).genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre does not exist");
  }
});

//GET movie director data
app.get("/movies/directors/:dirName", (req, res) => {
  const director = movies.find(
    (movie) => movie.director.dirName === req.params.dirName
  ).director;
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send("Director not found.");
  }
});

//POST new user (to POST new user to users)
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser.userName) {
    newUser.userId = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("userName not entered");
  }
});

//PUT nuewUserName (to allow users to update userName)
app.put('/users/:userId', (req, res) => {
  const reqBody = req.body;
  const user = users.find((user) => user.userId == pUserId);
  if (user) {
    user.userName = reqBody.userName;
    res.send(user);
  }

});

//POST new movie to user's topFIlms array
app.post("/users/:userId/:movie", (req, res) => {
  const pUserId = req.params.userId;
  const pMovie = req.params.movie;
  let user = users.find((user) => user.userId == pUserId);

  if (user) {
    console.log('user found');
    user.topFilms.push(pMovie);
    res.status(200).send(`${pMovie} has been added to user ${pUserId}'s array`);
  } else {
    res.status(400).send("User does not exist");
  }
});

//DELETE movie from user's topFilms array
app.delete("/users/:userId/:movie", (req, res) => {
  const pUserId = req.params.userId;
  const pMovie = req.params.movie;
  let user = users.find((user) => user.userId == pUserId);
  if (user) {
      res.status(200).send(`${pMovie} has been deleted from user ${pUserId}'s array`);
  } else {
    res.status(404).send("User does not exist");
  }
});

//DELETE user from users
app.delete("/users/:userId", (req, res) => {
  const pUserId = req.params.userId;
  let user = users.find((user) => user.userId == pUserId);
  if (user) {
    users = users.filter((user) => {
      return user.userId !== pUserId;
    });
    console.log("here");
    res.status(201).send("User " + pUserId + " was deleted.");
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