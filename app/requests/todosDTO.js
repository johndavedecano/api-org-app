import request from 'superagent';
import Q from 'q';
/**
 * view
 */
export function view(_id) {
	const deferred = Q.defer();
	request
		.get('/api/todos/' + _id)
		.query({ limit : limit })
		.end((err, response) => {
			deferred.resolve(JSON.parse(response.responseText));
		});
	return deferred.promise;
}
/**
 * load
 */
export function load(limit) {
	const deferred = Q.defer();
	request
		.get('/api/todos')
		.query({ limit : limit })
		.end((err, response) => {
			console.log(response);
			deferred.resolve(JSON.parse(response.text));
		});
	return deferred.promise;
}
/**
 * updateTodo description
 */
export function update(todo) {
	const deferred = Q.defer();
	request
		.put('/api/todos/' + todo._id)
		.send({
			title : todo.title
			, text : todo.text
			, done : todo.done
		})
		.end((err, response) => {
			deferred.resolve(JSON.parse(response.text));
		});
	return deferred.promise;
}
/**
 * create
 */
export function create(todo) {
	const deferred = Q.defer();
	request
		.post('/api/todos')
		.send(todo)
		.end((err, response) => {
			deferred.resolve(JSON.parse(response.text));
		});
	return deferred.promise;
}
/**
 * destroy
 */
export function destroy(_id) {
	const deferred = Q.defer();
	request
		.del('/api/todos/' + _id)
		.end((err, response) => {
			deferred.resolve(JSON.parse(response.text));
		});
	return deferred.promise;
}