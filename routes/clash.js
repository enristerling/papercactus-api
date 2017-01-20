var express = require('express');
var router = express.Router();

var clashApi = require('clash-of-clans-api');
var client = clashApi({token: process.env.API_KEY});

router.get('/clans', function(req, res, next){
    client
        .clans()
        .withName('Paper Cactus')
        .fetch()
        .then(response => res.json(response))
        .catch(err => console.log(err))
});

router.get('/papercactus', function(req, res, next){
    client
        .clanByTag('#9CGGVLLL')
        .then(response => res.json(response))
        .catch(err => console.log(err))
});


module.exports = router;