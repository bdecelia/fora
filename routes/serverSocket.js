exports.init = function(io) {
	let currentviewers = 0; // keep track of the number of viewers
	let reactCounts = { smile: 0, frown: 0, meh: 0, wow: 0};

	io.sockets.on('connection', function (socket) {

		socket.emit('updateReacts', reactCounts);
		socket.broadcast.emit('updateReacts', reactCounts);

		socket.on('message', function (data) {
			socket.emit('newMessage', { message: data.message});
			socket.broadcast.emit('newMessage', { message: data.message});
		});

		socket.on('react', function (data) {
			reactCounts[data.react]++;
			socket.emit('updateReacts', reactCounts);
			socket.broadcast.emit('updateReacts', reactCounts);
		});

		socket.on('disconnect', function () {
			--currentviewers;
			socket.broadcast.emit('viewers', { number: currentviewers});
		});
	});
};
