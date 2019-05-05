const express       = require('express');
const bodyParser    = require('body-parser');
const request       = require('request');
const app           = express();
var os              = require("os");
var hostname        = os.hostname();

const weatherApiKey = '6fff6aaa446248276619c698beb22f3d'; // https://openweathermap.org/api
const mapApiKey     = 'Gxxyg7GH2PBHYYZvZwsABn7kldNMTGl1'; // https://developer.mapquest.com/

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var bgURL = '/bg0' + (Math.round(Math.random() * (7 - 1)) + 1) + '.jpg';
  res.render('index', {hostname: hostname, weather: null, bgURL: bgURL, error: null});
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {hostname: hostname, weather: null, bgURL: bgURL, error: 'Error, please try again...'});
      var bgURL = '/bg0' + (Math.round(Math.random() * (7 - 1)) + 1) + '.jpg';
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        var bgURL = '/bg0' + (Math.round(Math.random() * (7 - 1)) + 1) + '.jpg';
        res.render('index', {hostname: hostname, weather: null, bgURL: bgURL, error: 'Error, please try again...'});
      } else {
        bgURL = `https://open.mapquestapi.com/staticmap/v5/map?key=${mapApiKey}&center=${weather.name},${weather.sys.country}&size=1920,1920&zoom=14&type=sat`;
        res.render('index', {hostname: hostname, weather: weather, bgURL: bgURL, error: null});
      }
    }
  });
});

app.listen(80, function () {
  console.log('Running...');
});
