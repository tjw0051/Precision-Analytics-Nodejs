// models/SearchError.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LogEventSchema = new Schema({
	app: String,
	type: String,
	userId: String,
	sessionId: String,
	params: {}
});
module.exports = mongoose.model('LogEvent', LogEventSchema);
