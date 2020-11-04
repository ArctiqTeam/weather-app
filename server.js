var os = require("os");
var hostname = os.hostname();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'f002d3d7fb3d277147c305e0be192ac6';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null, hostname: hostname});
  console.log('New visitor to the weather app served from: ' + hostname)
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees farenheit in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null, hostname: hostname});
      }
    }
    console.log('New visitor to the weather app!')
  });
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
