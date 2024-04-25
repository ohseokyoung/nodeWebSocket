var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
    var mapping = request.url;  // "/"--> movie_play.html  "/movie/Wildlife.mp4" -> Wildlife.mp4 
    if(mapping=='/'){
        fs.readFile(__dirname+"/movie_play.html", "utf-8", function(error, htmlSrc){
            if(!error){
                response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                response.end(htmlSrc);
            }
        });
    }else if(mapping.indexOf("/movie")== 0){ //영상파일 요청일때
        //스트리밍! : 동영상은 파일 용량이 크므로 한번에 전송하지 않고 여러번 나누어 전송
        //           한번에 전송하는 파일의 크기가 65535 byte이다
        //1. 스트리밍 처리를 위한 객체 생성하기
        var stream = fs.createReadStream(mapping.substring(1));

        //2. data이벤트 : 영상파일이 읽어지면 data이벤트가 발생한다.
        var cnt = 1;

        stream.on('data', function(movieData){
            response.write(movieData);
            console.log(cnt++, movieData.length);
        });

        //3. end이벤트 : 데이터를 더이상 읽을 수 없을 때 발생.
        stream.on('end', function(){
            response.end();
            console.log("전송완료");
        });
        
        //4. error이벤트 : 읽기처리시 에러가 발생하면 처리할 이벤트
        stream.on('error', function(){
            response.end();
            console.log('error stream...');
        });


    }
});

server.listen(10016, function(){
    console.log("server start ... http://localhost:10016");
});