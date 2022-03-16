//load express
const express = require('express');
const app = express();

//load morgan
const morgan = require('morgan');

//log request data in terminal
app.use(morgan('common'));

let myfavoriteMovies = [
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

//GET topMovies JSON for '/movies' request URL
app.get('/movies', (req, res) => {
    res.json(myfavoriteMovies);
  });
  
//GET Welcome message for '/' request URL
app.get('/', (req, res) => {
res.send('Welcome! This site will be about awesome movies!');
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