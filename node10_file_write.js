var fs = require('fs');

//1. 비동기식 쓰기
var writedata = "비동기식으로 파일에 쓰기 연습중. \r\n 줄바꿈 확인하기...";
//                       파일명(경로),  내용,       인코딩      콜백함수
fs.writeFile(__dirname+'/file_write1.txt', writedata, 'utf-8', function(error){
    if(error){
        console.log("쓰기 에러발생");
    }else{
        console.log("쓰기 완료됨");
    }
});



//2. 동기식 쓰기
var writedataSync = "동기식으로 file write .....";
       
try{                     //              파일명, 내용, 인코딩
    fs.writeFileSync(__dirname+"/file_write_sync.txt", writedataSync, 'utf-8');
    console.log("동기식 쓰기 완료");
}catch(error){
    console.log("동기식 쓰기 예외발생..."+ error);
}