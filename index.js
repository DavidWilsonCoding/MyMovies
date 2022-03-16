const express = require('express');
const app = express();

let myFavouriteMovies = [
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

// GET requests
app.get('/', (req, res) => {
  res.send('The site will be about my favorite movies!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(myFavouriteMovies);
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});