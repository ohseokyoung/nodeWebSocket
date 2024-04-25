/*
    nodejs는 이벤트기반 서버 프레임워크이다.
    모듈을 객체로 생성하여 사용할 수 있다.
*/

// 서버를 생성하여 접속을 받을 수 있도록 페이지 생성하기

// http모듈(http.js)을 이용하여 서버를 생성할 수 있다.
// 1. http모듈을 생성하기
var http = require('http');

// 2. http모듈을 이용하여 서버를 생성한다.
var server = http.createServer(function(request, response){
    // 접속한 클라이언트에게 응답하기
    // response에 쓰기를 하면 웹브라우저가 받아서 웹페이지에 보여준다.
    //1. Content-Type 설정하기
    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); //key value
    //2. 웹페이지 내용보내기
    response.write('<h1 style="color:red">노드를 이용한 웹페이지</h1>');
    response.write('<p>http모듈을 이용하여 서버를 생성할 수 있다.</p>');
    response.end("마지막입니다."); //마지막에 end호출해줘야함!
    
});

// 3. 접속대기하는 이벤트처리
// 0~65535개의 port
server.listen(10000, function(){
    console.log("server start .... http:/127.0.0.1:10000");
});

