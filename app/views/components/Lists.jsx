import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';

class Lists extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="todo-lists fadeIn">
			    {this.props.data.todos.map(function(todo, i) {
			    	if (todo.done == this.props.data.done) {
			        	return <Item todo={todo} key={i} index={i} />
			    	}
			    }.bind(this))}	
			</div>
		)
	}
}

export default connect(function(state) {
	return {
		data : state.todos
	}
})(Lists);