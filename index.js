import http from "http"

// const SOCKET_PATH = "/var/run/docker.sock"

export class Docker_API {

	constructor(SOCKET_PATH) {
		// do some error handlind
		this.SOCKET_PATH = SOCKET_PATH;
	}

	listContainers() {
		    let options = {
			        socketPath: this.SOCKET_PATH,
				    path: "http://localhost/v1.41/containers/json"
	        }
		    let clientRequest = http.request(options, res => {
			        res.setEncoding("utf8");
				    res.on("data", data => console.log(JSON.parse(data)));
					res.on("error", error => console.error(error));
	        });
		    clientRequest.end();
	}

	createContainer() {
		    let options = {
			        socketPath: this.SOCKET_PATH,
				    path: "http://localhost/v1.41/containers/create",
					method: "POST",
	                headers: {"Content-Type": "application/json"}
		    }
	        let payload = JSON.stringify({ "Image": "alpine" })
		    let clientRequest = http.request(options, res => {
			        res.setEncoding("utf8");
				    res.on("data", data => console.log(JSON.parse(data)));
					res.on("error", error => console.error(error));
	        });
		    clientRequest.write(payload);
			clientRequest.end();
	}

}
