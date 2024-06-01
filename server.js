// Import necessary modules
const http = require('http');
const next = require('next');
const SocketIO = require('socket.io');

// Determine if the environment is development or production
const dev = process.env.NODE_ENV !== 'production';
// Define the hostname and port
const hostname = 'localhost';
const port = 3000;

// Initialize the Next.js application with the specified settings
const app = next({ dev: dev, hostname: hostname, port: port });
const handler = app.getRequestHandler(); // Get the request handler for Next.js

// Prepare the Next.js app
app.prepare().then(function () {
  // Create an HTTP server using the Next.js request handler
  const httpServer = http.createServer(handler);

  // Initialize Socket.IO with the HTTP server
  const io = SocketIO(httpServer);

  // Set up the connection event listener for Socket.IO
  io.on('connection', (socket) => {
    // Set up the message event listener for the connected socket
    socket.on('message', (message) => {
      if (message?.sender === 'Party A') {
        // Broadcast a sync message to all other connected clients
        socket.broadcast.emit('sync-message', { actionType: 'sync', message });
      } else {
        // Broadcast an alert message to all other connected clients
        socket.broadcast.emit('sync-message', { actionType: 'alert', message });
      }
    });

    // Set up the disconnect event listener for the connected socket
    socket.on('disconnect', () => {
      // Add logic to handle disconnection
    });
  });

  // Set up error handling for the HTTP server
  httpServer
    .once('error', function (err) {
      console.error(err);
      process.exit(1);
    })
    // Start the HTTP server and listen on the specified port
    .listen(port, function () {
      console.log('> Ready on http://' + hostname + ':' + port); // Log a message indicating the server is ready
    });
});
