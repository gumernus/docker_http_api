import { Docker } from "../src/index.js"

let docker = new Docker();

console.log(await docker.createContainer("alpine", "test1"));

// parameter 1: name of image
// parameter 2: name of container
