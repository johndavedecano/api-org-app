import { 
	TODOS_LOADED, 
	TODOS_CREATED,
	TODOS_UPDATED,
	TODOS_DELETED,
	TODOS_LIMIT_UPDATED,
	TODOS_STATUS_UPDATED
} from './constants';

/**
 * loadTodos
 */
export function loadTodos(todos) {
	return {
		type : TODOS_LOADED
		, todos
	}
}
/**
 * updateTodo description
 */
export function updateTodo(todo) {
	return {
		type : TODOS_UPDATED
		, todo
	}
}
/**
 * createTodo
 */
export function createTodo(todo) {
	return {
		type : TODOS_CREATED
		, todo
	}
}
/**
 * destroyTodo
 */
export function destroyTodo(_id) {
	return {
		type : TODOS_DELETED
		, _id
	}
}
/**
 * updateLimit
 */
export function updateLimit(limit) {
	return {
		type : TODOS_LIMIT_UPDATED
		, limit
	}
}
/**
 * updateStatus
 */
export function updateStatus(status) {
	return {
		type : TODOS_STATUS_UPDATED
		, status
	}
}