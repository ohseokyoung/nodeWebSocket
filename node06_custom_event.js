var http = require('http');
//1. 이벤트가 정의되어 있는 모듈
var events = require('events');

//2. 이벤트 처리를 하기 위해서 event모듈내의 EventEmitter를 초기화 해야한다.
var eventEmitter = new events.EventEmitter();

//3. 이벤트가 발생하면 실행할 함수를 만든다.
// on(),    addListner(),   once()
//              이벤트종류, 호출함수
eventEmitter.on('call', function(){
    // call이벤트가 발생하면 호출되는 함수
    console.log('call이벤트가 발생하였습니다..');
});

eventEmitter.addListener('check', function(){
    console.log("check이벤트가 발생하였습니다...");
});

//현재 서버에서 한번만 실행됨!
eventEmitter.once('test', function(){
    console.log("test(once)이벤트가 최초 실행되었습니다.. ");
});
//-----------------------------------------------------

var server = http.createServer(function(request, response){
    //이벤트 발생시키기 (emit)
    eventEmitter.emit('call');
    eventEmitter.emit('check');
    eventEmitter.emit('test');

    response.writeHead(200, {'Content-Type' :'text/html; charset=utf-8' });
    response.end("노드에서 이벤트 테스트 중...");
});

server.listen(10008, function(){
    console.log("server start (event)..... http://127.0.0.1:10008 ");
});
