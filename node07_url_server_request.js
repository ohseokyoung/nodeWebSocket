var http = require('http');

var server = http.createServer(function(request, response){
    //접속 주소 구하기
    var url = request.url;  // "/"  , "/username" , "/tel"  , "/address"

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    if(url =='/'){
        response.end("/<h1>홈페이지</h1>");
    }else if(url =='/username'){
        response.end("<h1>이름:홍길동</h1>");
    }else if(url =='/tel'){
        response.end("<h1>연락처:010-1234-1111");
    }else if(url =='/address'){
        response.end("<h1>주소:서울시 강남구");
    }else{
        response.end("<h1>404 Page</h1>");
    }
});

server.listen(10010, function(){
    console.log("server start... http://127.0.0.1:10010/ ");
    console.log("server start... http://127.0.0.1:10010/username ");
    console.log("server start... http://127.0.0.1:10010/tel ");
    console.log("server start... http://127.0.0.1:10010/address ");
});