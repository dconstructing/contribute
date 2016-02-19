var Octokat = require('octokat');

module.exports = {
	getPublic: function(token) {
		var octo = new Octokat({
			token: token
		});
		var user;
		return octo.me.fetch().then(function(loggedInUser) {
			console.log('user', loggedInUser);
			user = loggedInUser;
			return loggedInUser.repos.fetch();
		}).then(function(repos) {
			return repos.filter(function(repo, index) {
				if (repo.private) {
					return false;
				} else if (repo.owner.login !== user.login) {
					return false;
				}
				return true;
			});
		});;
	}
}
