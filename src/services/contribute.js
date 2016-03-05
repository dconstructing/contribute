import config from '../../config.json';

Backendless.initApp(config.baas.backendless.appId, config.baas.backendless.secretKey, config.baas.backendless.version)

function Repositories(args) {
	args = args || {};
	this.name = args.name || 'Default name';
	this.description = args.description || 'No Description';
	this.url = args.url;
}
var dataStore = Backendless.Persistence.of(Repositories);

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

export function random() {
	return new Promise((resolve, reject) => {
		dataStore.find(new Backendless.Async(function(data) {
			resolve(data.data);
		}, function(error) {
			reject(new Error('error finding data'));
			console.error('error finding data', error);
		}));
	});
}

export function search(input) {
	return new Promise((resolve, reject) => {
		var query = {
			condition: "name LIKE '%" + input + "%' OR description LIKE '%" + input + "%'"
		}
		dataStore.find(query, new Backendless.Async(function(data) {
			resolve(data.data);
		}, function(error) {
			reject(new Error('error finding data'));
			console.error('error finding data', error);
		}));
	});
}
