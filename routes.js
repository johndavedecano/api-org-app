const todos = require('./controllers/todos');
const tv = require('./validations/TodosValidator');
/**
 * Application Router Registry
 */
export function initialize(app, router) {
	router.get(
		'/',
		todos.index
	);
	router.get(
		'/todos',
		todos.lists
	);
	router.post(
		'/todos', 
		tv.create.validate(),
		tv.create.handle,
		todos.create
	);
	router.get(
		'/todos/:todo_id',
		tv.common.exists,
		todos.show
	);
	router.put(
		'/todos/:todo_id',
		tv.common.exists,
		tv.create.validate(),
		tv.create.handle,
		todos.update
	);
	router.delete(
		'/todos/:todo_id',
		tv.common.exists, 
		todos.destroy
	);
	app.use('/api', router);
}