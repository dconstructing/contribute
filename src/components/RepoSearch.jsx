import React from 'react';
import SearchInput from 'react-search-input'

import Repo from './Repo';

let dummyRepo = {
	name: 'octocat/HelloWorld',
	owner: 'octocat',
	issues: 50,
	stars: 10,
	watchers: 20
}

let fakeItem = [];

export default class RepoSearch extends React.Component {
	constructor(props) {
		super(props);
	}

	search(query) {
		console.log('search', query);
	}

	render() {
		return (
			<div>
				<SearchInput ref='search' onChange={this.search.bind(this)} />
				<Repo repo={dummyRepo} />
			</div>
		);
	}
}
