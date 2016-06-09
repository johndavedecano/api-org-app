const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const TodoSchema   = new Schema({
    title    : String,
    text     : String,
    done     : Boolean
},{
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);