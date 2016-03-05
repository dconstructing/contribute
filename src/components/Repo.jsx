import React from 'react';

export default class Repo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="reactRepo">
				<p className="name"><a href={this.props.repo.url}>{this.props.repo.name}</a></p>
				<p className="description">{this.props.repo.description}</p>
				<p className="link"><a href={this.props.repo.url}>{this.props.repo.url}</a></p>
			</div>
		);
	}
}

Repo.propTypes = {
	repo: React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		description: React.PropTypes.string,
		url: React.PropTypes.string,
		owner: React.PropTypes.string
	}).isRequired
};
