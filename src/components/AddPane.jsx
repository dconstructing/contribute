var React = require('react');

var GithubLogin = require('./GithubLogin');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			expanded: false,
			token: null
		};
	},

	expand: function() {
		this.setState({expanded: true});
	},
	tokenReceived: function(token) {
		this.setState({token: token});
	},

	componentWillMount: function() {
		var url = window.location;
		// The `code` will be in the address bar as long as this runs before the login component
		// replaces the history, which it always should because the login component won't run until
		// the expand state has been set to true.
		if (url.search !== '' && url.search.indexOf('?code=') === 0) {
			this.expand();
		}
	},
	render: function() {
		var content;
		if (!this.state.expanded) {
			content = <button type="button" onClick={this.expand}>Add Project</button>
		} else if (!this.state.token) {
			content = <GithubLogin clientId="cebd40667a0b8bb6ea10" onTokenReceived={this.tokenReceived} />
		} else {
			content = <p>Token: {this.state.token}</p>
		}
		return (
			<div>
				{content}
			</div>
		);
	}
});
