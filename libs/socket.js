module.exports = function(io){
	io.sockets.on('connection', function(client){
		client.emit('hello', {title: 'Connected...', msg:'Welcome!'});
		client.broadcast.emit('hello', {title: 'New connection!'});
	});
}