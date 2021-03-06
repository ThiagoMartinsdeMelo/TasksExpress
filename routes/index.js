var express = require('express');
var router = express.Router();
var model = require('./../model/tasks')();

/* GET home page. */
router.get('/', function(req, res, next) {
	model.find(null, function(err, tasks){
		if (err) {
			throw err;
		}
		res.render('index', {title: 'TasksExpress', tasks: tasks});	
	});
});

router.post('/add', function(req, res, next){
	var body = req.body;
	body.status = false;
	model.create(body, function(err, task){
		if (err) {
			throw err;
		}
		//res.redirect('/');
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(task));
	});
});

router.get('/turn/:id', function(req, res, next){
	var id = req.params.id;
	model.findById(id, function(err, task){
		if (err) {
			throw err;
		}
		task.status = !task.status;
		task.save(function(){
			//res.redirect('/');
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(task));
		});
	});
});


module.exports = router;