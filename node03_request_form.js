var http = require('http');
const {URLSearchParams} = require('url'); //url.js

var server = http.createServer(function(request, response){

    //받은 데이터를 누적시킬 변수
    var postData = '';
    //post방식으로 서버에 접속하면 자동으로 data란 이벤트가 발생한다.
    //       이벤트종류, 실행할 함수(서버로 넘어온 데이터)
    request.on('data', function(receiveData){
        postData += receiveData;
    });

    //post방식으로 서버에 접속하여 데이터 보내는 작업이 완료되면 end이벤트 발생.
    request.on('end', function(){
        console.log(postData);
        var postParams = new URLSearchParams(postData);
        console.log(postParams);

        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.write("<ol><li>번호 : "+postParams.get("no")+"</li>");
        response.write("<li>제목 : "+ postParams.get("title")+"</li>");
        response.end("<li>글내용 :"+ postParams.get("content")+"</li></ol>");

    });

});

server.listen(10004, function(){
    console.log("server start ..... http://localhost:10004");
});

