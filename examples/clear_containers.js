import { Docker } from "../src/index.js"

let docker = new Docker();

console.log(await docker.clearContainers());

// this will delete all stopped containers
