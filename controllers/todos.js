const Todo = require('./../models/todo');

export function index(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
}
export function show(req, res) {
	Todo.findById(req.params.todo_id, (err, todo) => {
		return res.json(todo);
	});
}
export function lists(req, res) {
	let limit = parseInt(req.query.limit) || 10;
	if (limit < 1) {
		limit = 1;
	}
	Todo
		.find()
		.limit(limit)
		.sort('-createdAt')
		.exec((error, todos) => {
			if (error) {
				res.status(422).send(error);
			}
			res.json({
				data  : todos,
				count : todos.length,
				limit : limit
			});
		});
}
export function create(req, res) {
	let todo = new Todo();
	todo.title = req.form.title;
	todo.text = req.form.text;
	todo.done = req.form.done;
	todo.save((err, payload) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.json(payload);
	});
}
export function update(req, res) {
	Todo.findById(req.params.todo_id, (err, todo) => {
		todo.title = req.form.title;
		todo.text = req.form.text;
		todo.done = req.form.done;
		todo.save((err, payload) => {
			if (err) {
				return res.status(500).send(err);
			}
			return res.json(payload);
		});
	});
}
export function destroy(req, res) {
	Todo.remove({
	    _id: req.params.todo_id
	}, function(err, todo) {
	    if (err)
	        res.send(err);
	    res.json({ message: 'Successfully deleted' });
	});
}