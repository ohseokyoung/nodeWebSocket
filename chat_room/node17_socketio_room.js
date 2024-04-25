var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    fs.readFile(__dirname+'/chat_room.html', 'utf-8', function(error, chatCode){
        if(!error){
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end(chatCode);
        }
    });
}).listen(10026, function(){
    console.log('chatRoom server start... http://127.0.0.1:10026/chat');
});

//---------------단체 채팅-------------------------------
var socketio = require('socket.io');
var io = socketio.listen(server);

//접속대기
io.sockets.on('connection', function(socket){
    var rName;
    //방생성 이벤트(join)
    socket.on('join', function(roomName){
        //방만들기
        socket.join(roomName); //룸이름을 접속소켓에 조인하면 문자 전송시 같은 룸이름을 가진 소켓은 서로 문자를 주고 받을 수 있음!
        rName = roomName;

        io.sockets.in(rName).emit('response', rName+"방이 만들어 졌습니다.");
    });

    //클라이언트가 보낸 문자를 받아 같은 방에 있는 접속자에게 보낼 이벤트
    socket.on('sendMessage', function(receive){
        //같은 룸 접속자에게 문자 보내기
        io.sockets.in(rName).emit('response', rName+"->"+receive+"("+new Date()+")");  //rName 전역변수에 선언되어있음
        
    });
});