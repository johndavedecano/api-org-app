import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from './../actions';

class TodosView extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			_id    : null,
			title  : '',
			text   : '',
			done   : false,
			saving : false,
			success : false
		}
		setTimeout(this.getInitialData.bind(this));
	}

	getInitialData() {
		const todos = this.props.data.todos.filter((todo) => {
			return todo._id === this.props.params.todo_id;
		});
		if (!todos[0]) {
			return this.context.router.goBack();
		}
		this.setState({
			_id    : todos[0]._id,
			title  : todos[0].title,
			text   : todos[0].text,
			done   : todos[0].done
		});
	}
	onSubmit(e) {
		e.preventDefault();
		this.setState({ saving : true, success : true });
		this.props.dispatch(updateTodo({
			_id    : this.state._id,
			title  : this.state.title,
			text   : this.state.text
		}));
		setTimeout(() => {
			this.setState({ saving : false, success : false });
		}, 500);
	}
	onChange(e) {
		this.setState({
			[e.target.getAttribute('name')] : e.target.value
		});
	}
	onCancel() {
		return this.context.router.push("/");
	}
	onUpdate(e) {
		e.preventDefault();
		return this.context.router.push('/update/' + this.state._id);
	}
	render() {
		const saving = (this.state.saving == false) ? 'btn btn-block btn-success' : 'btn btn-block btn-success disabled';
		const savingText = (this.state.saving == false) ? 'Save Changes' : 'Saving Please Wait....';
		const success = (this.state.success == false) ? 'alert alert-success hide fadeOut' : 'alert alert-success fadeIn';
		return (
			<div className="container" style={{ padding : 10 }}>
				<div className="row">
					<div className="col-md-12">
						<div style={{ paddingLeft : 15, paddingRight : 15, paddingBottom : 25, marginBottom : 25, clear : 'both', borderBottom : 'solid 1px #ccc' }}>
							<h2 className="pull-left">View Todo</h2>
							<a style={{ marginTop : 25 }} className="btn btn-danger pull-right" onClick={this.onCancel.bind(this)} href="javascript:void(0)">Back</a>
							<div style={{ clear : 'both' }}></div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div style={{ padding: 15 }}>
									<form onSubmit={this.onSubmit.bind(this)}>
										<div className="form-group">
											<label>Title</label>
											<p>{this.state.title} - <a onClick={this.onUpdate.bind(this)} href="javacript:void(0)" data-id={this.state._id}>Edit</a></p>
										</div>
										<div className="form-group">
											<label>Status</label><br/>
											{ this.state.done ? <label className="label label-success">Finished</label> : <label className="label label-info">Active</label> }
										</div>
										<div className="form-group">
											<label>Description</label>
											<div>{this.state.text}</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}

TodosView.contextTypes = {
    router    : React.PropTypes.object.isRequired
};

export default connect(function(state) {
	return {
		data : state.todos
	}
})(TodosView);