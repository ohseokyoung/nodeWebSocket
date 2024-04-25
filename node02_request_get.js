//모듈객체(http) http변수에 담는다
var http = require('http');

//서버생성
var server = http.createServer(function(request, response){
    //클라이언트 측에서 서버로 보낸정보는 request객체 내의 url변수가 가지고 있다.
    console.log(request.url);
    var data = request.url;
    // ?위치를 구하고 -> ?다음문자부터 문자를 구한다.
    var idx = data.indexOf("?");
    var param = data.substring(idx+1); //idx +1부터 문자열로 구하는 js메소드
    console.log(param);

    // URLSearchParams 문자열로 되어 있는 쿼리데이터를 처리하는 클래스
    var params = new URLSearchParams(param);
    console.log(params);

    //응답
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write("<h2>서버에서 get방식으로 request한 데이터</h2>");
    response.write("<div>번호 : "+ params.get('num')+ "</div>");
    response.write("<div>이름 : "+ params.get('name')+ "</div>");
    response.write("<div>연락처 : "+params.get('tel')+ "</div>");

    // post방식 전송용 폼-----------------------------------------------------------
    response.write("<hr/><h2>post방식 전송 확인용 폼</h2>");
    response.write("<form method='post' action='http://127.0.0.1:10004'>");
    response.write("번호 : <input type='text'  name='no'/><br/>");
    response.write("제목 : <input type='text' name='title'/><br/>");
    response.write("글내용 : <textarea name='content' rows='5' cols='50'></textarea><br/>");
    response.write("<input type='submit' value='보내기'/>");

    response.end("</form>");
});

//접속대기
server.listen(10002, function(){
    console.log("server start ..... http//localhost:10002/?num=1234&name=홍길동&tel=010-1234-3333");
});