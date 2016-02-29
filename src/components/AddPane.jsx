import React from 'react';

import GithubLogin from './GithubLogin';
import Repo from './Repo';

import repoService from '../services/repositories';

export default class AddPane extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			token: JSON.parse(window.localStorage.getItem('account')),
			ownedRepos: []
		};
	}

	_getRepos(token) {
		repoService.getPublic(token).then((repos) => {
			console.log('got repos', repos);
			this.setState({ownedRepos: repos});
		});
	}

	expand() {
		this.setState({expanded: true});
	}

	tokenReceived(token) {
		var context = this;
		this.setState({token: token});
		this._getRepos(token);
	}

	componentWillMount() {
		var url = window.location;
		// The `code` will be in the address bar as long as this runs before the login component
		// replaces the history, which it always should because the login component won't run until
		// the expand state has been set to true.
		if (url.search !== '' && url.search.indexOf('?code=') === 0) {
			this.expand();
		}

		if (this.state.token) {
			this._getRepos(this.state.token);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		window.localStorage.setItem('account', JSON.stringify(this.state.token));
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
					let repo = {
						name: item.fullName,
						owner: item.owner.login,
						issues: item.openIssuesCount,
						stars: item.stargazersCount,
						watchers: item.watchersCount
					}
					return <Repo key={item.id} repo={repo} />
				})}
			</div>
		}
		return (
			<div id="addProject">
				{content}
			</div>
		);
	}
}
