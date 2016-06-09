import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTodo, destroyTodo } from './../../actions';
import * as requests from './../../requests/todosDTO';

class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	changeStatus(e) {
		this.props.todo.done = (this.props.todo.done) ? false : true;
		requests.update(this.props.todo);
		this.props.dispatch(updateTodo(
			this.props.todo
		));
	}
	onDelete(e) {
		requests.destroy(this.props.todo._id);
		return this.props.dispatch(destroyTodo(
			this.props.todo._id
		));
	}
	onUpdate(e) {
		e.preventDefault();
		return this.context.router.push('/update/' + this.props.todo._id);
	}
	onView(e) {
		e.preventDefault();
		return this.context.router.push('/view/' + this.props.todo._id);
	}
	render() {
		const statustext = (this.props.todo.done) ? 'Back' : 'Finish';
		return (
			<div className="item">
				<div className="row">
					<div className="col-xs-12 col-md-9">
						<h4 className="pull-left">
							<a onClick={this.onUpdate.bind(this)} href="javacript:void(0)" data-id={this.props.todo._id}>{this.props.todo.title}</a>
						</h4>
					</div>
					<div className="col-xs-12 col-md-3">
						<a className="btn btn-small btn-success pull-right" onClick={this.changeStatus.bind(this)}>{statustext}</a>
						<a className="btn btn-small btn-info pull-right" onClick={this.onView.bind(this)}>View</a>
						<a className="btn btn-small btn-danger pull-right" onClick={this.onDelete.bind(this)}>Delete</a>
					</div>
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}

Item.contextTypes = {
    router    : React.PropTypes.object.isRequired
};

export default connect(function(state) {
	return {
		...state
	}
})(Item);