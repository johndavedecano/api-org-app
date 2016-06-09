import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lists from './components/Lists';
import { updateStatus, loadTodos, updateLimit } from './../actions';
import * as requests from './../requests/todosDTO';

class Todos extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			count : 0
		}
	}
	componentDidMount() {
	    return this.getInitialData();
	}
	getInitialData() {
		requests.load(this.props.data.limit)
			.done(query => {
				this.setState({
					count : query.count
				});
				return this.props.dispatch(loadTodos(query.data))
			});
	}
	onCreate(e) {
		e.preventDefault();
		return this.context.router.push('/create');
	}
	onChangeDone(e) {
		e.preventDefault();
		const status = (e.target.getAttribute('data-done') == "0") ? false : true;
		return this.props.dispatch(
			updateStatus(
				status
			)
		);
	}
	onLoadMore() {
		const limit = this.props.data.limit + 10;
		this.props.dispatch(updateLimit(limit));
		requests.load(limit)
			.done(query => {
				this.setState({
					count : query.count
				});
				return this.props.dispatch(loadTodos(query.data))
			});
	}
	render() {
		const active = (this.props.data.done == false) ? 'btn btn-default btn-block active' : 'btn btn-default btn-block';
		const inactive = (this.props.data.done == false) ? 'btn btn-default btn-block' : 'btn btn-default btn-block active';
		return (
			<div className="container" style={{ padding : 10 }}>
				<div className="row">
					<div className="col-md-12">
						<div style={{ paddingLeft : 15, paddingRight : 15, paddingBottom : 25, clear : 'both', borderBottom : 'solid 1px #ccc' }}>
							<h2 className="pull-left">Todos</h2>
							<a style={{ marginTop : 25 }} className="btn btn-primary pull-right" onClick={this.onCreate.bind(this)} href="javascript:void(0)">Add Todo</a>
							<div style={{ clear : 'both' }}></div>
						</div>
						<div style={{ padding: 10 }}>
							<Lists />
							<div className="row">
								<div className="col-md-12">
									<a href="javascript:void(0)" style={{ marginBottom : 10 }} onClick={this.onLoadMore.bind(this)} className="btn btn-success btn-block btn-large" data-done="0">Load More</a>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<a href="javascript:void(0)" style={{ marginBottom : 10 }} onClick={this.onChangeDone.bind(this)} className={active} data-done="0">Active</a>
								</div>
								<div className="col-md-6">
									<a href="javascript:void(0)" style={{ marginBottom : 10 }} onClick={this.onChangeDone.bind(this)} className={inactive} data-done="1">Finished</a>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		)
	}
}
Todos.contextTypes = {
    router  : React.PropTypes.object.isRequired
};

export default connect(function(state) {
	return {
		data : state.todos
	}
})(Todos);