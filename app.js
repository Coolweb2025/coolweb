import { createServer } from "http";
import next from "next";

const port = parseInt(process.env.PORT, 10) || 35869; // Passenger poda PORT
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, (err) => {
    if (err) throw err;
    console.log("> Server ready on port", port);
  });
});
