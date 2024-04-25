//사용자 정의 모듈 만들기
//변수, 함수를 모듈로 생성할 수 있다.
// 모듈은 반드시 export 키워드를 이용하여 생성하여야 한다!!

//1. 변수를 선언하는 방법
exports.productCode = 123456;
exports.productName = '컴퓨터';

//2. 함수를 모듈로 만드는 방법 (두 수를 전달받아 합을 구하여 반환하는 sum함수!!)
exports.sum = function(n1, n2){  //sum(n1,n2)
    return n1+n2;
}

exports.minus = (x, y)=>{   //minus(x,y)
    return x-y;
}

exports.gugudan = (dan)=>{
    let result = "<ul>";
    for(var i=2; i<10; i++){
        result += "<li>"+ dan +" * "+ i + " = " + (dan*i) +"</li>"; 
    }
    return result += "</ul>";
}

