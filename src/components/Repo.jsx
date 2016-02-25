import React from 'react';

export default class Repo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="reactRepo">
				<p className="name">{this.props.repo.name}</p>
				<div className="extras">
					<span className="issues">{this.props.repo.issues}</span>
					<span className="stars">{this.props.repo.stars}</span>
					<span className="watchers">{this.props.repo.watchers}</span>
				</div>
			</div>
		);
	}
}

Repo.propTypes = {
	repo: React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		owner: React.PropTypes.string,
		issues: React.PropTypes.number,
		stars: React.PropTypes.number,
		watchers: React.PropTypes.number
	}).isRequired
};
