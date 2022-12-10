import papi from "papi"

export class Docker extends papi.Client {

	constructor(opts) {
		opts = opts || {};
	    opts.baseUrl = "http://localhost/v1.41";
		super(opts);
  	}

	async listContainers() {
		let opts = {
      		path: `/containers/json`,
			socketPath: "/var/run/docker.sock"
    	}
		let res = await this._get(opts);
	    return res.body;
  	}

	async createContainer(image, name) {
		let opts = {
			path: `/containers/create?name=${name}`,
			headers: {"Content-Type": "application/json"}, 
			body: {
				"Image": image,
				"Hostname": name,
				"HostConfig":{
					"PortBindings":{
						"80/tcp":[{"HostPort":"80"}]
					}
				},
				"Tty": true
			},
			socketPath: "/var/run/docker.sock"
		}
		let res = await this._post(opts);
		this.startContainer(res.body.Id)
		return res.body;
	}

	async startContainer(id) {
		let opts = {
			path: `/containers/${id}/start`,
			socketPath: "/var/run/docker.sock",
		}
		let res = await this._post(opts);
		return res.body;
	}

	async clearContainers() { // don't use in prod
		let opts = {
			path: `/containers/prune`,
			socketPath: "/var/run/docker.sock",
		}
		let res = await this._post(opts);
		return res.body;
	}

}
