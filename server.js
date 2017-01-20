require('dotenv').config();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var clash = require('./routes/clash');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
// app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);
app.use('/clash', clash);

app.listen(port, function(){
    console.log('Server started on port '+port);
});