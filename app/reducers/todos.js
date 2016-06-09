import { 
	TODOS_LOADED, 
	TODOS_CREATED,
	TODOS_UPDATED,
	TODOS_DELETED,
	TODOS_LIMIT_UPDATED,
	TODOS_STATUS_UPDATED
} from './../constants';

const todosState = {
	limit : 10000,
	done  : false,
	todos : []
}

function todos(state = todosState, action) {
	switch(action.type)  {
		case TODOS_LOADED:
			return {
				...state,
				todos : action.todos
			};
		break;
		case TODOS_CREATED:
			state.todos.push(action.todo);
			return { 
				...state,
				todos : state.todos
			};
		break;
		case TODOS_UPDATED:
			return {
				...state,
				todos : state.todos.map((todo) => {
					if (todo._id == action.todo._id) {
						return Object.assign({}, todo, action.todo);
					}
					return todo;
				})
			};
		break;
		case TODOS_DELETED:
			return {
				...state,
				todos : state.todos.filter((todo) => {
					return todo._id !== action._id;
				})
			};
		break;
		case TODOS_LIMIT_UPDATED:
			return {
				...state,
				limit : action.limit
			};
		break;
		case TODOS_STATUS_UPDATED:
			return {
				...state,
				done : action.status
			};
		break;
	}	
	return state;
}

export default todos;