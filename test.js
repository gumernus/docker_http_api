import fetch from 'node-fetch'

// Node 18 uses undici fetch, so you don't have to import fetch. But you can.
import { Agent } from "undici";

// The URL must parse as a valid url, but the hostname doesn't matter for the connection.
// I've included a dummy value of... dummy. But you could use real host names if proxying, or route off the host name.
fetch("http://localhost/v1.41/containers/json", {
  dispatcher: new Agent({
    connect: {
      socketPath: "/var/run/docke.socr"
    }
  })
});
