//이미지 파일을 클라이언트에게 보내기
var http = require('http'); //http모듈

var fs = require('fs'); //fs모듈

http.createServer(function(request, response){
    //이미지를 읽어 클라이언트(response)에 쓰기
    fs.readFile(__dirname+'/img/오연서.jpg', function(error, imgSrc){
        if(!error){
        //                                         마임(image/jpeg, image/gif, ...)
        response.writeHead(200, {'Content-Type':'image/jpeg' });
        response.end(imgSrc);
        }
    });

}).listen(10012, function(){
    console.log('start server.... http://127.0.0.1:10012');
});