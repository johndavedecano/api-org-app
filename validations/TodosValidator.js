const form = require("express-form");
const field = form.field;
const Todo = require('./../models/todo');

export const common = {
	exists : function(req, res, next) {
		Todo.findById(req.params.todo_id, (err, todo) => {
			if (err || !todo) {
				return res.status(404).json({ error : "Unable to find todo." });
			}
			return next(); // Pass todo object to the next guy
		});
	}
}
export const create = {
	validate : () => {
		return form(
			field("title").trim().required(),
			field("text").trim().required(),
			field("done").trim().required().toBoolean()
		);
	},
	handle : (req, res, next) => {
		 if (!req.form.isValid) {
			return res.status(422).json({ error : req.form.errors });
		 }
		 return next();
	}
}
export const update = {
	validate : () => {
		return form(
			field("title").trim().required(),
			field("text").trim().required(),
			field("status").trim().toBoolean().required()
		);
	},
	handle : (req, res, next) => {
		 if (!req.form.isValid) {
			return res.json(req.form.errors);
		 }
		 return next();
	}
}