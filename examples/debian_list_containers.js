import { Docker } from "../src/index.js"

let docker = new Docker();

console.log(await docker.listContainers());
