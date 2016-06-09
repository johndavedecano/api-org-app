import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from './../actions';
import * as requests from './../requests/todosDTO';

class TodosUpdate extends Component {
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
		requests.update({
			_id    : this.state._id,
			title  : this.state.title,
			text   : this.state.text,
			done   : this.state.done
		})
		.done(query => {
			setTimeout(() => {
				this.setState({ saving : false, success : false });
			}, 500);
		});
	}
	onChange(e) {
		this.setState({
			[e.target.getAttribute('name')] : e.target.value
		});
	}
	onCancel() {
		return this.context.router.push("/");
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
							<h2 className="pull-left">Update Todo</h2>
							<a style={{ marginTop : 25 }} className="btn btn-danger pull-right" onClick={this.onCancel.bind(this)} href="javascript:void(0)">Back</a>
							<div style={{ clear : 'both' }}></div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div style={{ padding: 15 }}>
									<div className={success}>
										<p>Successfully Saved</p>
									</div>
									<form onSubmit={this.onSubmit.bind(this)}>
										<div className="form-group">
											<label>Title</label>
											<input type="text" required name="title" value={this.state.title} className="form-control" onChange={this.onChange.bind(this)} />
										</div>
										<div className="form-group">
											<label>Description</label>
											<textarea type="text" required name="text" value={this.state.text} className="form-control" onChange={this.onChange.bind(this)} rows="10"></textarea>
										</div>
										<div className="form-group">
											<button type="submit" className={saving}>{savingText}</button>
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

TodosUpdate.contextTypes = {
    router    : React.PropTypes.object.isRequired
};

export default connect(function(state) {
	return {
		data : state.todos
	}
})(TodosUpdate);