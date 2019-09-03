var express = require('express');
var router = express.Router();
var dataBase = require('./database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(dataBase));
});

/*******************************************************/

router.get('/music-albums', function(req, res, next) {
  const { musicAlbums } = dataBase;
  res.send(JSON.stringify(musicAlbums));
});

router.get('/music-albums/:id', function(req, res, next) {
  const { id } = req.params;
  const { musicAlbums } = dataBase;
  const result = musicAlbums.find(el => el.id == id);
  res.send(JSON.stringify(result));
});

router.delete('/music-albums/:id', function(req, res, next) {
  const { id } = req.params;
  const { musicAlbums } = dataBase;
  const index = musicAlbums.findIndex(el => el.id == id);
  musicAlbums.splice(index, 1);
  res.send(JSON.stringify(musicAlbums));
});

router.put('/music-albums/:id', function(req, res, next) {
  const { id } = req.params;
  const { title } = req.body;
  const { musicAlbums } = dataBase;
  const result = musicAlbums.find(el => el.id == id);
  console.log(result);
  result.title = title;
  res.send(JSON.stringify(result));
});

router.post('/music-albums', function(req, res, next) {
  const { title } = req.body;
  const { musicAlbums } = dataBase;
  const lastElem = musicAlbums[musicAlbums.length - 1];
  const { id } = lastElem;
  const result = {
    id: id + 1,
    title
  };
  musicAlbums.push(result);
  console.log(result);
  res.send(JSON.stringify(result));
});

/*******************************************************/

router.get('/user', function(req, res, next) {
  const { users } = dataBase;
  const result = users.find(el => el.id === 0);
  res.send(JSON.stringify(result));
});

router.put('/user', function(req, res, next) {
  const { name, lastName, email, phone, balance } = req.body;
  const { users } = dataBase;
  const result = users.find(el => el.id == 0);
  console.log(users, result, req.body);
  result.name = name;
  result.lastName = lastName;
  result.email = email;
  result.phone = phone;
  result.balance = balance;
  res.send(JSON.stringify(result));
});

router.get('/credit-card', function(req, res, next) {
  const { creditCard } = dataBase;
  res.send(JSON.stringify(creditCard));
});

router.put('/credit-card', function(req, res, next) {
  const { number, cvv, expirationDate, fullName } = req.body;
  const { creditCard } = dataBase;
  console.log(creditCard, req.body);
  creditCard.number = number;
  creditCard.cvv = cvv;
  creditCard.expirationDate = expirationDate;
  creditCard.fullName = fullName;
  res.send(JSON.stringify(creditCard));
});



module.exports = router;
