import React from 'react';
import SearchInput from 'react-search-input'

import Repo from './Repo';

import * as contributeService from '../services/contribute';

let fakeItem = [];

export default class RepoSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foundRepos: []
		};
	}

	search(query) {
		contributeService.search(query).then((repos) => {
			this.setState({foundRepos: repos});
		});
	}

	componentDidMount() {
		contributeService.random().then((repos) => {
			this.setState({foundRepos: repos});
		});
	}

	render() {
		return (
			<div>
				<SearchInput ref='search' onChange={this.search.bind(this)} />
				<div>
					{ this.state.foundRepos.map((repo) => {
						return <Repo key={repo.name} repo={repo} />
					})}
				</div>
			</div>
		);
	}
}
