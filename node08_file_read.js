// fs : 파일의 내용을 읽고, 쓰기를 할 수 있는 모듈 FileSystem
// fs라는 모듈을 추가하여야 한다.
// 콘솔에서 해당 프로젝트에서 구현
// > npm install fs
var fs = require('fs');

// 파일 입출력을 하기 위해서 해당 파일의 경로 + 파일명이 필요하다.

// [노드 전체의 전역변수]
//[1] __filename : 현재 실행되는 파일의 경로와 파일명을 절대주소로 가지고 있다.
//                  C://Users\dig03\firstnode/node08_file_read.js
//[2] __dirname : 현재 실행되는 파일의 경로를 절대주소로 가지고 있다.
//                  C://sers\dig03\firstnode

console.log("__filename->"+ __filename);
console.log("__dirname->"+ __dirname);

//비동기식으로 파일 읽는 방법 : 읽기, 쓰기 명령이 바로 실행되지 않고 스레드로 처리되는것.
//              경로 + 파일명       인코딩    콜백함수(error,내용) : 파일의 내용을 읽은 후 실행할 함수
fs.readFile(__dirname+"/start.js", 'utf-8', function(error, data){
    //파일 읽기 에러가 안난 경우
    if(!error){
        console.log("파일읽기 : 비동기식");
        console.log(data);
    }else{
        console.log("파일읽기 에러...");
    }
});

//동기식으로 파일 읽는 방법 : 읽기, 쓰기 명령을 만나면 바로 실행된다.
var data2 = fs.readFileSync(__dirname+"/test.txt", 'utf-8');
console.log("파일읽기 : 동기식 ---------");
console.log(data2);