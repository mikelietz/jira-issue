var https = require('https');

var nerdie = null
  , prefix = null
  , config = null
  , baseurl = null;

function Jira_Issue(parentNerdie) {
	config = (parentNerdie.config.plugins.jira_issue) ? parentNerdie.config.plugins.jira_issue : {};
	this.pluginInterface = new parentNerdie.iface(parentNerdie, this);
	nerdie = parentNerdie;
}

Jira_Issue.prototype.init = function () {
	var prefixes = config.prefix.join('|');
	var pattern = RegExp( "^(" + prefixes + ")-(\\d+)$", "i" );
	this.pluginInterface.registerPattern( pattern,
		this.jira_issue
	);
};

Jira_Issue.prototype.jira_issue = function(msg) {
	var username = config.username,
		password = config.password,
		api_url = config.api_url,
		issue = msg.match_data[0].toUpperCase(),
		issue_url = config.issue_base_url + issue;

	var options = {
		hostname: config.hostname,
		path: config.path + "issue/" + issue,
		auth: username + ":" + password
	};

//	console.log( options );

	var req = https.request( options, function( res ) {
//		console.log("statusCode: ", res.statusCode);
//		console.log("headers: ", res.headers);

		res.on('data', function(d) {
//			process.stdout.write(d);
			try {

				var parsed_data = JSON.parse( d );
				if ( parsed_data.fields ) {
// console.log( parsed_data.fields );
// console.log( "=============================================");
// console.log( parsed_data.fields.summary);
// console.log( parsed_data["status"] );
					msg.say( issue + " Status: " + parsed_data.fields.status.value.name  );
					msg.say( "Summary: " + parsed_data.fields.summary.value );
					msg.say( "Issue URL: " + issue_url + " API URL: " + parsed_data.self );
				}
				else if ( parsed_data.errorMessages ) {
// console.log( parsed_data.errorMessages[0] );
					msg.say( parsed_data.errorMessages[0] );
				}
			} catch (e) {
				msg.say( "Could not parse response. You might try " + issue_url );
				return;
			}
		});

	});
	req.end();

	req.on( 'error', function(e) {
		msg.say( "There was an error. " + e );
	});
};

module.exports = Jira_Issue;
