export function submit(token, repo) {
	return new Promise((resolve, reject) => {
		// send repo to our app backend
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://contribute.dconstructing.com/data/repo');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Authorization', 'bearer ' + token);
		xhr.onload = function(event) {
			if (this.status == 200) {
				var data = JSON.parse(this.response);
				console.log('submit response', data);
				resolve(data);
			}
		}
		xhr.send(JSON.stringify(repo));
	});
}
