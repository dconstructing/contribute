var React = require('react');

module.exports = React.createClass({
	handleButtonClick: function(event) {
		var url = 'https://github.com/login/oauth/authorize?';
		url +='client_id=' + this.props.clientId;
		window.location = url;
	},
	componentDidMount: function() {
		var url = window.location;
		console.log('url', url);
		if (url.search !== '' && url.search.indexOf('?code=') === 0) {
			var code = url.search.split('=')[1];
			console.log('code', code);
			// send `code` to our app backend
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:3080/exchange/github');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = function(event) {
				if (this.status == 200) {
					var data = JSON.parse(this.response);
					console.log('token', data.token);
				}
			}
			xhr.send('{"code":"' + code + '"}');
		}
	},
	render: function() {
		return <button type="button" onClick={this.handleButtonClick}>GitHub</button>
	}
});
