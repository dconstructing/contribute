import React from 'react';
import SearchInput from 'react-search-input'

import Repo from './Repo';

let dummyRepos = [{
	name: 'octocat/HelloWorld',
	owner: 'octocat',
	issues: 50,
	stars: 10,
	watchers: 20
}, {
	name: 'dconstructing/contribute',
	owner: 'dconstructing',
	issues: 0,
	stars: 1,
	watchers: 2
}];

let fakeItem = [];

export default class RepoSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foundRepos: dummyRepos
		};
	}

	search(query) {
		console.log('search', query);
		this.setState({
			foundRepos: dummyRepos.filter((repo) => {
				return repo.name.includes(query);
			})
		});
	}

	render() {
		return (
			<div>
				<SearchInput ref='search' onChange={this.search.bind(this)} />
				<div>
					{ this.state.foundRepos.map(function(repo) {
						return <Repo key={repo.name} repo={repo} />
					})}
				</div>
			</div>
		);
	}
}
