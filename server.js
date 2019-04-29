const express       = require('express');
const bodyParser    = require('body-parser');
const request       = require('request');
const app           = express();
var os              = require("os");
var hostname        = os.hostname();

const weatherApiKey = '6fff6aaa446248276619c698beb22f3d'; // https://openweathermap.org/api
const mapApiKey     = 'Gxxyg7GH2PBHYYZvZwsABn7kldNMTGl1'; // https://developer.mapquest.com/

var mapType         = 'sat';                              // map, hyb, sat, light, dark

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {hostname: hostname, weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {hostname: hostname, weather: null, error: 'Error, please try again...'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        res.render('index', {hostname: hostname, weather: null, error: 'Error, please try again...'});
      } else {
        if(typeof req.query.map != 'undefined') {
          mapType = req.query.map;
        }
        res.render('index', {hostname: hostname, weather: weather, mapApiKey: mapApiKey, mapType: mapType, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Running...')
})
