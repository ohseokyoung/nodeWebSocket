var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    if(req.url=='/chatform'){
        fs.readFile(__dirname+'/chattingForm.html', 'utf-8', function(e, formData){
            if(!e){
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                res.end(formData);
            }
        });
    }
});

server.listen(10020, function(){
    console.log("chatServer start ... http://127.0.0.1:10020/chatform");
});

//============================채팅프로그램 만들기==================================
// ~> npm install socket.io@2
// 1) 필요한 모듈 객체를 만든다.
var socketio = require('socket.io');

// 2) 현재 서버를 이용한 소켓서버를 생성한다.
var io = socketio.listen(server);

// 3) 접속을 대기하는 이벤트를 생성
//              이벤트종류 콜백함수
io.sockets.on('connection', (socket)=>{
    console.log("클라이언트 접속함.");

    //클라이언트가 보낸 문자를 받을 이벤트 구현(hello이벤트 발생시 처리할 기능)
    socket.on('hello', function(msg){ //msg : 클라이언트가 보낸 메시지
        console.log(msg);

        //hi 이벤트 발생 : 서버가 클라이언트에게 문자 보내기(1:1 방식)
        //socket.emit('hi', '안녕 서버에서 보낸 문자...');
        socket.emit('hi', "[1:1통신]>>"+msg);
    });
});
