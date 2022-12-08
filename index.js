const http = require("http");

const SOCKET_PATH = "/var/run/docker.sock"

function listContainers() {

        let options = {
                socketPath: SOCKET_PATH,
                path: "http://localhost/v1.41/containers/json"
        }
        let clientRequest = http.request(options, res => {

                res.setEncoding("utf8");
                res.on("data", data => console.log(JSON.parse(data)));
                res.on("error", error => console.error(error));

        });
        clientRequest.end();

}

function createContainer() {

        let options = {
                socketPath: SOCKET_PATH,
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
