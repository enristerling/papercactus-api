var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var clashApi = require('clash-of-clans-api');
var db = mongojs('mongodb://enristerling:enristerling@ds111489.mlab.com:11489/mytasklist_ricky', ['tasks']);

// Get All Tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

router.get('/clans', function(req, res, next){
    let client = clashApi({
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImUyNTI0YzRiLTFhNTgtNGM2Yi04NWViLWMwNDVmMGUzNDQ2ZSIsImlhdCI6MTQ4NDcwNTk3NSwic3ViIjoiZGV2ZWxvcGVyLzAzZjI3YWZjLTEwNzItNjA4Ny05NjQwLTZhZjllNDAyMTNlOCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjUwLjI0Ljc0LjExNyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.G5AUqLmVo0y8tL3YJ2ftl2QoSe5HHWS98q_cnASxhwwtJi1ZceZ1sgvUtsw62Rp8LDgeadnEQWj3cy3edMJ9yA" // Optional, can also use COC_API_TOKEN env variable
    });

    client
        .clans()
        .withWarFrequency('always')
        .withMinMembers(25)
        .fetch()
        .then(response => res.json(response))
        .catch(err => console.log(err))
});

// Get Single Task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    
    if(task.title){
        updTask.title = task.title;
    }
    
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

module.exports = router;