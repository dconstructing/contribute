import React from 'react';

import GithubLogin from './GithubLogin';

import repoService from '../services/repositories';

export default class AddPane extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			token: null,
			ownedRepos: []
		};
	}

	expand() {
		this.setState({expanded: true});
	}

	tokenReceived(token) {
		var context = this;
		this.setState({token: token});
		// get repos
		repoService.getPublic(token).then(function(repos) {
			console.log('got repos', repos);
			context.setState({ownedRepos: repos});
		});
	}

	componentWillMount() {
		var url = window.location;
		// The `code` will be in the address bar as long as this runs before the login component
		// replaces the history, which it always should because the login component won't run until
		// the expand state has been set to true.
		if (url.search !== '' && url.search.indexOf('?code=') === 0) {
			this.expand();
		}
	}

	render() {
		var content;
		if (!this.state.expanded) {
			content = <button type="button" onClick={this.expand.bind(this)}>Add Project</button>
		} else if (!this.state.token) {
			content = <GithubLogin clientId="cebd40667a0b8bb6ea10" onTokenReceived={this.tokenReceived.bind(this)} />
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
}
