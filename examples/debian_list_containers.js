import { Docker_API } from "../index.js"

let docker = new Docker_API("/var/run/docker.sock");
docker.listContainers()
