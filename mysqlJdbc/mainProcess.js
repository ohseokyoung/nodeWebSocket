var http = require('http');
var fs = require('fs');
// express 모듈  : 클라이언트가 get방식, post방식으로 접근할 때 접속을 받아내는 함수 : get(), post()
// npm install express
var express = require('express');
// session 객체 사용하기 위한 모듈
// npm install express-session
var session = require('express-session');
// ejs파일 사용(embed javascript)
// npm install ejs
var ejs = require('ejs');
//접속자의 IP를 구하는 모듈
// npm install request-ip
var requestip = require('request-ip'); 

//서버 생성
var app = express();
var server = http.createServer(app);
//----------------------------------------
//Post방식 접속시 데이터 request를 위한 설정!!
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true})); // 한글인코딩

// ==== mysql connection ====
// npm install mysql2
var mysqldb = require('mysql2');  //모듈가져오기(mysql2)
var connection = mysqldb.createConnection({//db 연결 json데이터
    host : '127.0.0.1',
    port : 3306, 
    user : 'root',
    password : 'tiger1234',
    database : 'mydb'
});
connection.connect();

//----------------------------------------------------
var head = {'Content-Type':'text/html; charset=utf-8'};
//홈으로       http://localhost:10018/index
app.get('/index', function(req, res){
    if(session.user==undefined || session.user==null){
        res.render(__dirname+'/index.ejs', {logStatus:'N'});
    
    }else{
        res.render(__dirname+'/index.ejs', {
            user : session.user,
            logStatus : "Y"
        });
    }
});
//로그인 폼으로 http://localhost:10018/login
app.get('/login', function(req, res){
    fs.readFile(__dirname+'/login.html', function(error, longinData){
        if(!error){
            res.writeHead(200, head);
            res.end(longinData);
        }
    });
});

//로그인 (DB조회)
app.post('/loginOk', function(req, res){
    var userid = req.body.userid;
    var userpwd = req.body.userpwd;
    console.log(userid, userpwd);

    //DB조회
    var sql = "select userid, username from users where userid=? and userpwd=?";

    //쿼리문 실행
    //              쿼리문, 데이터(배열로 처리-> ?의 값으로 사용 ), 콜백함수
    connection.execute(sql, [userid, userpwd], function(error, record){
        if(error){
            res.redirect("/login"); 
        }else{// 쿼리문 정상 수행됨
            console.log(record);
            if(record.length>0){// 로그인성공
                //session에 필요한 정보를 기록
                session.user = {
                    userid : record[0].userid,
                    username : record[0].username,
                    autorized : true 
                }

                //ejs 파일을 읽어 데이터와 함께 보내기
                fs.readFile(__dirname+'/index.ejs', 'utf-8', function(e, indexData){
                    if(e){
                       res.writeHead(200, head);
                       res.end("404 page"); 
                    }else{
                        res.render(__dirname+'/index.ejs',{

                            user : session.user,
                            logStatus : "Y"

                        });
                    }
                });

            }else{// 로그인실패
                res.redirect("/login");
            }
        }
    });
});

//로그아웃
app.get('/logout', function(req, res){
    if(session.user){//세션의 user변수에 로그인정보 있으면(true) 정보를 지운다.
        session.user = null;
    }
    res.redirect('/index');

    
});

//게시판목록/////
app.get('/boardList', function(req, res){
    //db(mydb-board)에서 레코드 선택 뷰(list.ejs)로 이동하기 
    var sql = "select b.no, b.subject, b.userid, u.username, b.hit, ";
    sql += " date_format(b.writedate, '%m-%d %H:%i') writedate from board b";
    sql += " join users u on b.userid=u.userid order by b.no desc";
    //                 쿼리문, 데이터(?없으면 생략), 콜백함수
    connection.execute(sql, function(error, result){
        if(!error){
            console.log(result);
            var totalRecord = result.length;

            res.render(__dirname+"/list.ejs",{
                records:result,
                totalRecord:totalRecord,
                pageNum:3
            });

        }
        
    });
});

//글쓰기 폼
app.get('/write', function(req, res){
    //로그인 여부 확인
    if(session.user==undefined || session.user==null){//로그인 안된 경우
        res.writeHead(200, head);
        res.write("<script>");
        res.write("     alert('로그인 후 글쓰기가 가능합니다');");
        res.write("     location.href='/login';");
        res.end("</script>");
    }else{//로그인 된 경우
        fs.readFile(__dirname+"/write.ejs", 'utf-8', function(e, writeView){
            if(!e){
                res.writeHead(200, head);
                res.end(writeView);
            }
        });
    }
});

//글등록(DB) express객체 = app
app.post('/writeOk', function(req, res){
    //데이터준비
    var subject = req.body.subject;
    var content = req.body.content;
    var userid = session.user.userid;
    var ip = requestip.getClientIp(req).substring(7);//ip모듈설치 - 객체 이름 : requestip (::ffff:127.0.0.1)

    var sql = "insert into board(subject, content, userid, ip) values(?,?,?,?)";

    var bindData = [subject, content, userid, ip];
    
    connection.execute(sql, bindData, function(error, result){
        console.log(result);
        if(!error && result.affectedRows==1){ //등록된경우
            res.redirect("/boardList");
        }else{//등록 안된경우
            
            res.writeHead(200, head);
            res.write("<script>");
            res.write("alert('글 등록이 실패하였습니다.');");
            res.write("history.back();");
            res.end("</script>");
        }
    });
});
//글 내용보기
app.get('/view', function(req, res){ //http://127.0.0.1:10018/view?no=51
    //레코드 : url -> view?no=51
    let query = req.url.substring(6);
    let params = new URLSearchParams(query); //key-value 로 바꿔줌. {no=>51, userid=>'dig03208'}
    let no = params.get("no");

    //조회수
    connection.execute('update board set hit = hit+1 where no=?', [no] , function(e,r){
        console.log("조회수증가");
    });
    //레코드선택
    var sql = "select no, subject, content, hit, writedate, userid from board";
        sql += "where no=?";
    connection.execute(sql, [no], function(error, record){
        if(error){
            res.redirect("/boardList");
        }else{
            //로그인, 현재글과 로그인아이디 같은지
            var logCheck = "N";
            if(session.user!=undefined && session.user!=null && record[0].userid==session.user.userid){
                logCheck = "Y";            

            }
            res.render(__dirname+"/view.ejs",{ //렌더링
                result:record,
                logCheck:logCheck

            });
           
        }
    });
});
//수정 폼
app.get('/edit', function(req, res){

    var params = new URLSearchParams(req.url.substring(req.url.indexOf("?")+1));
    var sql = "select no, subject, content from board where no=?";

    connection.execute(sql, [params.get("no")], function(error, result){
        if(error){
            res.redirect("/view?no="+params.get("no"));

        }else{
            res.render(__dirname+"/edit.ejs", {
                record : result
            });
        }
    });
});

    //수정(DB)
    app.post('/editOk', function(req, res){
        //데이터준비
        var no = req.body.no;
        var subject = req.body.subject;
        var content = req.body.content;

        var sql = "update board set subject=?, content=? where no=?";

        connection.execute(sql, [subject, content, no], function(error, result){
           // 실패 : 글수정폼
           if(error || result.affectedRows!=1){
            res.writeHead(200, head);
            res.write("<script>");
            res.write("alert('글 수정이 실패하였습니다.');");
            res.write("history.go(-1);");
            res.end("</script>");

           }else{//성공 : 글내용보기,
            res.redirect("/view?no="+no);
           }
            console.log(result); 
        });
    });
    
    //삭제
    app.get('/del', function(req, res){
        var params = new URLSearchParams(req.url.substring(req.url.indexOf('?')+1));    
        
        var sql = "delete from board where no=?";
        connection.execute(sql, [params.get('no')], function(e, r){
            if(e || r.affectedRows!=1){//삭제실패
                res.redirect("/view?no="+params.get('no'));
            }else{//삭제성공
                res.redirect("/boardList");
            }
        });
    });


//********************** */
server.listen(10018, function(){
    console.log("server start..... http://127.0.0.1:10018/index");
});

