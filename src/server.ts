// import 'dotenv/config'
import http from 'http'
import app from './app.js';
import { initSocket } from './socket/index.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app)

// Initialize socket.io
initSocket(server);


server.listen(Number(port), '0.0.0.0', () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
