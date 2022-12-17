import { Docker } from "../src/index.js"

let docker = new Docker();

console.log(await docker.createContainer("<image name>", "<name for container>"));

// will create and start container
