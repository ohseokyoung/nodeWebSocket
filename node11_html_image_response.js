
//홈페이지 내용을 index.html의 문자로 사용하기

var http = require('http');
var fs = require('fs');

// 마임을 구하기 위한 모듈 다운받기
// npm install mime@2        @2는 버전
var mime = require('mime');

http.createServer(function(request, response){
    var url = request.url;      //  /img/뚱이.png   ... n번접속
    //index.html 을 읽어서 클라이언트에게 보내기
    if(url=="/index"){
    fs.readFile(__dirname+'/index.html', 'utf-8', function(e, d){
        response.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        if(!e){
            response.end(d);
        }else{
            response.end("404 Page");
        }
    });
    }else if(url.indexOf("/img")==0){//접속주소가 이미지이면 /img로 시작한다
        //마임을 알아내서 파일의 종류를 구분하여 response에 쓰기.
        var mimeType = mime.getType(url.substring(1)); //1번째 인덱스 부터toString
        console.log(mimeType);

        fs.readFile(__dirname+url, function(e, imgSrc){
            if(!e){
                response.writeHead(200, {'Content-Type':mimeType});
                response.end(imgSrc);
            }
        });
    }
}).listen(10014, function(){
    console.log("server start .... http://localhost:10014/index");
})