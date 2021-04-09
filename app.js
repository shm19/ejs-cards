const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const cards = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/cards.json`));

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  const page = req.query.page ? req.query.page * 1 : 1;
  let pageCards = [...cards].splice((page - 1) * 6);
  res.render('pages/home', {
    pageCards,
    number: Math.min(pageCards.length, 6),
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/concat', (req, res) => {
  res.render('pages/concat');
});

app.get('/profile/:id', (req, res) => {
  let id = req.params.id * 1;
  const card = cards.find(el => el.id === id);
  res.render('pages/profile', card);
});

app.get('/search', (req, res) => {
  let tittle = req.query.tittle;
  let matchCards = [];
  cards.map(el => {
    if (el.tittle.match(tittle)) {
      matchCards.push(el);
    }
  });
  console.log(matchCards);
  res.render('pages/home', {
    pageCards: matchCards,
    number: Math.min(matchCards.length, 6),
  });
});
module.exports = app;
/**
 * Profile
 * Pagination
 * Seach
 * About
 * Conccat
 */
