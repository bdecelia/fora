// Express
// -------

const express = require('express');
const morgan = require('morgan');
const sio = require('socket.io');
const http = require('http');
const app = express();

const httpServer = http.Server(app);
const io = sio(httpServer);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

// Routes
// ------

require('./routes/main').init(app);
require('./routes/serverSocket.js').init(io);

// Start Application
// -----------------

httpServer.listen(3005, function() {
  console.log('App listening on port 3005');
});

