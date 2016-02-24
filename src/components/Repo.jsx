import React from 'react';

export default class Repo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<span>{this.props.repo.name}</span>
			</div>
		);
	}
}

Repo.propTypes = {
	repo: React.PropTypes.shape({
		name: React.PropTypes.string.isRequired
	}).isRequired
};
