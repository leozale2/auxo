const express = require("express");
const https = require("https");
const fs = require('fs');
const svgCaptcha = require('svg-captcha');


const {
  Nuxt,
  Builder
} = require('nuxt');
const ExpressCqrs = require("express-cqrs").default;
const session = require("express-session");

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require("./routes/index");

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge:200000
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

const actorPath = path.resolve("./actors");
const {domain,router} = ExpressCqrs({
  actorPath
});
const {
  readdirSync
} = require("fs");
const actorNames = readdirSync(actorPath).filter(filename => /\.js$/.test(filename)).map(filename => filename.substring(0, filename.length - 3));
var dbs = require("cqrs-nedb-query")(domain, actorNames);

app.use(function (req,res,next) {
   req.dbs = dbs;
   req.$domain = domain;
   next();
});

// Import API Routes
const routersPath = path.join(__dirname,"routes");
app.use('/', index);
app.get('/captcha', function (req, res) {
	var captcha = svgCaptcha.create({noise: 1});
	req.session.captcha = captcha.text;
	res.type('svg');
	res.status(200).send(captcha.data);
});
readdirSync(routersPath)
.filter(r=>(r!=='index.js' && /\.js$/.test(r)))
.map(r=>r.substring(0,r.length-3))
.forEach(r=>app.use('/'+r,require('./routes/'+r)));


app.use(router);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render);

app.listen(port)
console.log('Server listening on ' + host + ':' + port);
