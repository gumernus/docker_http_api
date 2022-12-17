import { Docker } from "../src/index.js"

let docker = new Docker();

console.log(await docker.createContainer({
	start: true, // start the container after creating
	image: "alpine", // image name
	entrypoint: "/bin/sh", // enetrypoint 
	ports: [ // allow ports
		{host: "80", container: "8080"}, 
		{host: "1234", container: "4321"}
	]
}));

// you can also add: 
// - memory: 
