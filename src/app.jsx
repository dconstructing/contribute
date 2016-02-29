import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import AddPane from './components/AddPane';
import RepoSearch from './components/RepoSearch';

let page = <div>
	<header>
		<h1>Contribute</h1>
		<AddPane />
	</header>
	<p>A searchable collection of projects looking for contributors.</p>
	<RepoSearch />
</div>

ReactDOM.render(page, document.getElementById('content'));
