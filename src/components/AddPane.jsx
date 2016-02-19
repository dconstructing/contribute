var React = require('react');

var GithubLogin = require('./GithubLogin');

var repoService = require('../services/repositories');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			expanded: false,
			token: null,
			ownedRepos: []
		};
	},

	expand: function() {
		this.setState({expanded: true});
	},
	tokenReceived: function(token) {
		var context = this;
		this.setState({token: token});
		// get repos
		repoService.getPublic(token).then(function(repos) {
			console.log('got repos', repos);
			context.setState({ownedRepos: repos});
		});
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
			content = <div>
				{ this.state.ownedRepos.map(function(item) {
					return <div key={item.id}>{item.fullName}</div>
				})}
			</div>
		}
		return (
			<div>
				{content}
			</div>
		);
	}
});
