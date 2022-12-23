// TODO add custom return so there isnt "undefined" when the action was successful
// TODO add removeContiner() function 

import papi from "papi"

function customErr(text) {
	console.log(new Error(text))
}

export class Docker extends papi.Client {

	constructor(opts) {
		opts = opts || {};
	    opts.baseUrl = "http://localhost/v1.41";
		opts.socketPath = opts.socketPath ? opts.socketPath : "/var/run/docker.sock"
		super(opts);
  	}

	// CONTAINERS (START)

	async listContainers() {
		let opts = { path: `/containers/json` }
		let res = await this._get(opts);
		return res.body;
  	}

	async clearContainers() { // don't use in prod
		let opts = { path: `/containers/prune` }
		let res = await this._post(opts);
		return res.body;
	}

	async createContainer(options) {
		if(!options.image) { options.image = customErr(`Image name for the new container was not included.`) }
		if(!options.name) { options.name = Math.random().toString(36).slice(2, 7) }
		if(!options.entrypoint) { options.entrypoint = "/bin/sh" }

		if(!options.memory) { options.memory = 0 }
		if(!options.memoryReservation) { options.memoryReservation = 0 }

		let ports = {};
		if(options.ports && typeof options.ports == "object") { 
			for(let port of options.ports) {
				if(typeof port.host != "string") { port.host.toString() }
				if(typeof port.container != "string") { port.container.toString() }
				ports[`${port.host}/tcp`] = [{"HostPort": port.container}]		
			}
		}

		let opts = {
			path: `/containers/create?name=${options.name}`,
			headers: {"Content-Type": "application/json"}, 
			body: {
				"Image": options.image,
				"Hostname": options.name,
				"Entrypoint": options.entrypoint,
				"HostConfig":{
					"Memory": options.memory,
					"MemoryReservation": options.memoryReservation,
					"PortBindings": ports
				},
				"Tty": true
			},
		}
		let res = await this._post(opts);
		if(options.start && options.start == true) { this.startContainer(res.body.Id) }
		return res.body;
	}

	async startContainer(id) {
		let opts = { path: `/containers/${id}/start` }
		let res = await this._post(opts);
		return res.body;
	}

	async stopContainer(id) {
		let opts = { path: `/containers/${id}/stop` }
		let res = await this._post(opts);
		return res.body;
	}

	async renameContainer(options) {
		let opts = { path: `/containers/${options.id}/rename?name=${options.name}` }
		let res = await this._post(opts);
		return res.body;
	}

	// CONTAINERS (END)

	

	
	// IMAGES (START)
	
	async listImages() {
		let opts = { path: `/images/json` }	
		let res = await this._get(opts);
		return res.body;
	}

}
