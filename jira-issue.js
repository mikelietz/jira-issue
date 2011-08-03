var NerdieInterface = require('nerdie_interface.js')
  , nerdie = null
  , prefix = null
  , config = null
  , baseurl = null;

function Jira_Issue(parentNerdie) {
	config = (parentNerdie.config.plugins.jira_issue) ? parentNerdie.config.plugins.jira_issue : {};
	this.pluginInterface = new NerdieInterface(parentNerdie, this);
	nerdie = parentNerdie;
}

Jira_Issue.prototype.init = function () {
	var pattern = RegExp( "^(" + config.prefix + "-|-)([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$" );
	this.pluginInterface.registerPattern( pattern,
		this.jira_issue
	);
};

Jira_Issue.prototype.jira_issue = function(msg) {
	msg.say( config.baseurl + config.prefix + '-' + msg.match_data[2] );
};

module.exports = Jira_Issue;
