var http = require('http');
//사용자 정의 모듈 가져오기
var myModule = require('./node04_custom_module_create');

var server = http.createServer(function(request, response){
    var param = request.url
    var params = param.substring(param.indexOf('?')+1); //n1=12&n2=5&dan=7

    var getParams = new URLSearchParams(params);    //{"n1"=>12, "n2"=>5, "dan"=>7}
    let n1 = getParams.get('n1');
    let n2 = getParams.get('n2');
    let dan = getParams.get('dan');

    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    response.write("<div>상품코드 : "+ myModule.productCode + "</div>");
    response.write("<div>상품명 : "+ myModule.productName +"</div>");
    response.write("<div>합 : (" + n1 + ", "+ n2 +") = " + myModule.sum(n1, n2)+ "</div>"); 
    response.write("<div>차 : "+ n1 + ", "+ n2 +") = " + myModule.minus(n1, n2)+ "</div>");
    response.end(myModule.gugudan(dan));

});

server.listen(10006, function(){
    console.log('server start ..... http://localhost:10006/?n1=12&n2=5&dan=7');

});


