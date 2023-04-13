/* 보그 PJ 회원가입 페이지 JS - member.js */


/* 보그 PJ 회원가입 페이지 JS - member.js */

///////////// 제이쿼리 코드 블록 /////////////////
$(()=>{
    console.log("제이쿼리 - 로딩완료!");

    /********************************************* 
        [ 사용자 입력폼 유효성 검사 ]
        - 이벤트종류 : blur(포커스가 빠질때 발생) <-> focus(포커스 들어갈 때)
        - 제이쿼리 이벤트 메서드 : blur()
        - 이벤트 대상:
        -> id가 'email2'가 아니고 class가 'search'가 
        아닌 type이 'text'인 입력요소 input
        과 함께 type이 'password'인 입력요소 input

        ->>>> 제이쿼리 선택표현법:
        input[type=text][id!=email2][class!=search],
        input[type=password]
        >>> 대괄호는 속성선택자(CSS원래문법) 
        != 같지않다(제이쿼리전용)

    *********************************************/
    $(`input[type=text][id!=email2][class!=search],
    input[type=password]`)
    // .on("blur", function(){ ->> 이렇게 쓰는 게 보편적인 방법!
    .blur(function(){
        // console.log("블러!");

        // 0.공백 제거 처리 함수
        // get rid of space -> 공백을 제거하라!
        const groSpace = cv => cv.replace(/\s/g,"");
        // 원형 : (cv)=>{return cv.replace(/\s/g,"")};
        // 정규식 : 슬래쉬(/) 사이에 표현함, \s 는 스페이스문자임
        // 정규식도 객체래,,
        // 참고사이트 : https://www.w3schools.com/jsref/jsref_obj_regexp.asp
        // 해석 : 스페이스문자(공백문자)를 모두 (g:global-전역) 찾아서 없애시오(빈 공백으로 변경)


        // 1.방금 블러가 발생한 요소의 id는?
        let cid = $(this).attr("id"); // -> attr(속성명) 속성명 하나만 쓰면 속성 찾아옴(getAttribute와 같음)
        // cid는 current id(현재 아이디) 줄임말!
        
        // 2.블러가 발생한 요소의 입력 값은?
        // let cv = $(this).val().trim();
        // -중간공백제거 함수 추가한 것 : groSpace($(this).val());
        // 근데 이름은 중간 공백 줘야함! 즉, 거기는 트림만 써야함! ->> 삼항연산자로 해결하기
        let cv = cid==="mnm" ? $(this).val().trim() : groSpace($(this).val());
        // ->> cid가 mnm이니? 응 : 아니
        // cv는 current value (현재값)란 뜻
        // val() : input요소의 값(value)을 읽기/쓰기용
        // trim() : 앞/뒤 공백 제거 (공백만 있을 때도 공백 지워버림)
        // groSpace() : 전체 공백 제거 함수 (위에서 작성함)

        // 2-1.서비스 차원으로 공백 제거된 데이터를 다시 입력창에 넣어줌
        $(this).val(cv); // val()에다가 값을 넣으면 그 값이 반영됨
        
        console.log(cid, cv);

        /*****************************************
            3.빈값 여부 검사하기
        *****************************************/
        if(cv === ""){
            // 메시지 출력
            $(this).siblings(".msg").text("필수입력!").removeClass("on");

            // 불통과!
            pass = false;
        }

        /************************************************************
            4.아이디일경우 유효성 검사
            -검사 기준 : 영문자로 시작하는 6~20글자 영문자/숫자
        ************************************************************/
        else if(cid === "mid"){
            // console.log("아이디 검사 결과: ", vReg(cv,cid));
            if(!vReg(cv,cid)){ // false일때 !(not연산자) 넣으면 됨!
                // 불통과일때 메시지
                $(this).siblings(".msg").text("영문자로 시작하는 6~20글자 영문자/숫자")
                .removeClass("on");
                // 클래스를 빼줘서 빨간색글자가 뜨게 만들기

                // 불통과!
                pass = false;
            } /////////////// if : 아이디검사 불통과시 ////////////////
            else{
                // 통과시
                /**************************************************************************************
                [ AJAX로 중복아이디 검사하기! ]
                ajax 처리 유형 2가지

                1) post 방식 처리 메서드
                - $.post(URL,data,callback)

                2) get 방식 처리 메서드
                - $.get(URL,callback)

                3) 위의 2가지 유형 중 선택처리 메서드
                -$.ajax({전송할페이지,전송방식,보낼데이터,전송할데이터타입,비동기옵션,성공처리,실패처리})
                -보내는 값은 하나! {속성:값}의 객체 데이터임
                -객체 안에 7가지 유형의 데이터를 보냄!
                **************************************************************************************/

                $.ajax({
                    // 1.전송할 페이지
                    url:"./process/chkID.php",
                    
                    // 2.전송 방식 (get / post 방식)
                    type: "post",

                    // 3.보낼 데이터 : 객체 형식
                    data: {"mid":$("#mid").val()},

                    // 4.전송할 데이터타입 (웹 문서일 경우 html임)
                    dataType: "html",
                    
                    // 5.비동기 옵션
                    async: false,
                    // ajax메서드는 비동기처리됨
                    // 다만 현재 문서와의 동기 처리를 하려면 비동기옵션값을 false로 해야함 - 동기화하는것임
                    // pass 전역 변수를 사용하기 위해 필요!
                    // 비동기라고 하면 완전히 분리?되어서 처리되기 때문에?? 전역변수 pass를 위해서???? false로, 한다고 함...????
                    // 최종 트리거 blur 발생시 순서대로 처리할 때 동기화해야하기 때문에!!!!
                    // 비동기화되면 병렬?이 되기 때문에 그러니까 프로세스에서분리되어버리기 때문에! 그래서 전혀 상관없어진다고..??머 그런 얘기..그래서 순서적으로 처리가 안 된대...(???)

                    
                    // 6.성공처리
                    success: function(res){ // res : 결과값 리턴
                        console.log(res);
                        if(res === "ok"){
                            $("#mid").siblings(".msg")
                            .text("멋진 아이디네요!")
                            .addClass("on");
                        } /////////// if : ok일 경우 ///////////
                        else{
                            // 아이디 중복시
                            $("#mid").siblings(".msg")
                            .text("이미 사용중인 아이디입니다!")
                            .removeClass("on");

                            // 불통과 처리해주기!!
                            pass = false;
                            // ->> 이 pass 변수 사용 이유로 async:false 옵션 처리함!!
                        } ////////// else : 아이디 중복일 경우 ////////////
                    }, //////////// success ////////////
                    
                    // 7.실패처리
                    // xhr : XMLHttpRequest 객체
                    // status : 실패 상태 코드 ex) 404
                    // error : 에러 결과값
                    error: function(xhr, status, error){
                        alert("연결 실행 실패: " + error);
                    } //////////// error /////////////

                }); /////////////////////// ajax 메서드 ////////////////////////




                // 1.DB에 아이디가 있는지 조회 후 결과로 처리해야함!
                // ->>지금은 보류!!

                // 만약 아이디가 이미 있으면 "이미 사용중이거나 탈퇴한 아이디입니다."
                // 만약 아이디가 없으면 " 멋진 아이디네요!"

                // 2.메시지 띄우기
                // $(this).siblings(".msg")
                // .text("멋진 아이디네요!")
                // .addClass("on");
                // 클래스를 줘서 초록색 글자가 뜨게 만들기
            } ///////// else : 아이디검사 통과시 ///////////////

        } ///////////// else if : id 검사 /////////////////

        /************************************************************
            5.비밀번호일경우 유효성 검사
            -검사 기준 : 특수문자,문자,숫자포함 형태의 5~15자리
        ************************************************************/
        else if(cid === "mpw"){
            // console.log("비밀번호 검사 결과: ", vReg(cv,cid));
            if(!vReg(cv,cid)){ // false일때 !(not연산자) 넣으면 됨!
                // 불통과일때 메시지
                $(this).siblings(".msg").text("특수문자,문자,숫자포함 형태의 5~15자리");

                // 불통과!
                pass = false;
            } /////////////// if : 비번 검사 불통과시 ////////////////
            else{
                // 통과시
                // 메시지 지우기
                $(this).siblings(".msg").empty();
            } ///////// else : 아이디검사 통과시 ///////////////
        } ///////////// else if : 비번 검사 /////////////////

        /************************************************************
            6.비밀번호 확인일경우 유효성 검사
            -검사 기준 : 비밀번호와 동일한 내용
        ************************************************************/
        else if(cid === "mpw2"){
            
            if(cv !== $("#mpw").val()){ // 비밀번호와 일치하지 않으면!
                // 불통과일때 메시지
                $(this).siblings(".msg").text("비밀번호가 일치하지 않습니다.");

                // 불통과!
                pass = false;
            } /////////////// if : 비번 검사 불통과시 ////////////////
            else{
                // 통과시
                // 메시지 지우기
                $(this).siblings(".msg").empty();
            } ///////// else : 아이디검사 통과시 ///////////////
        } ///////////// else if : 비번 검사 /////////////////

        /************************************************************
            7.이메일 유효성 검사
            -검사 기준 : 이메일 형식에 맞는지 여부 확인
        ************************************************************/
        else if(cid === "email1"){
            // 1.이메일 주소 만들기 : 앞주소@뒷주소
            let comp = eml1.val() + "@" + (seleml.val() === "free" ? eml2.val() : seleml.val());
            // (비?집:놀이동산)
            
            // 2.이메일 검사 함수 호출하기
            resEml(comp);

        } ///////////// else if : 이메일 유효성 검사 /////////////////

        ////// 모두 통과일 경우 메시지 지우기 /////////////
        else{
            // 메시지 지우기
            $(this).siblings(".msg").empty();
            // empty() : 내용 지우기

        } ///////// else : 모두 통과 ///////////////

        

    }); ////////////// blur 이벤트 ///////////////


    // 이메일 관련 대상 선정 //////////////////////
    // 이메일 앞주소
    const eml1 = $("#email1");
    // 이메일 뒷주소
    const eml2 = $("#email2");
    // 이메일 선택 박스
    const seleml = $("#seleml");
    //////////////////////////////////////////////
    
    /******************************************************
        선택 박스 변경시 이메일 검사하기
        ______________________________________
        검사 시점 : 선택 박스 변경할 때
        이벤트 : change -> 제이쿼리 change() 메서드
        이벤트 대상 : #seleml -> seleml변수
        
    ******************************************************/
    seleml.change(function(){

        // 1.선택박스 변경된 값 읽어오기
        let cv = $(this).val();
        console.log("선택값: ", cv);

        // 2.선택 옵션별 분기문
        if(cv === "init"){
            // "선택해주세요"
            
            // 1.메시지 출력
            eml1.siblings(".msg").text("이메일 옵션 선택 필수!")
            .removeClass("on"); // 글자 초록색 초기화

            // 2.직접 입력창 숨기기
            eml2.fadeOut(300);

        } ////////// if : "선택해주세요" ///////////////
        else if(cv === "free"){
            // "직접 입력"

            // 1.직접 입력창 보이기
            eml2.fadeIn(300).val("").focus();
            // : val(값)에다 값을 넣으면 입력창에 들어감 (빈 값은 내용을 지워줌) ->> 초기화 시켜주는 것임...
            // : focus()는 입력창에 포커스를 줌 (커서 깜빡임)

            // 2.기존 메시지 지우기
            eml1.siblings(".msg").empty();

        } ////////// else if : "직접 입력" /////////////////
        else{
            // 기타 이메일 주소

            // 1.직접 입력창 숨기기
            eml2.fadeOut(300);

            // 2.이메일 전체 주소 조합하기
            let comp = eml1.val()+"@"+cv;
            // : cv는 select박스 option의 vlaue값임

            // 3.이메일 유효성 검사 함수 호출하기
            resEml(comp);
            

        } //////////// else : 기타 이메일 주소 /////////////////
    }); //////////// change 이벤트 /////////////

    
    /*********************************************************
        키보드 입력시 이메일 체크하기
        _______________________________
        -키보드 관련 이벤트 : keypress, keyup, keydown
        1.keypress : 키가 눌려졌을 때
        2.keyup : 키가 눌렸다가 올라올 때 (바로 현재값을 보내줌)
        3.keydown : 키가 눌려져서 내려가 있을 때

        ->과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 적용해야할까?
        ->>>> keyup!!! (얘는 on("keyup"))말고 그냥 .keyup()메서드가 따로 있음!

        -이벤트 대상 : #email1, #email2
        ->모든 이벤트를 함수와 연결하는 제이쿼리 메서드는?
        ->>>> on(이벤트명, 함수)

    *********************************************************/
    $("#email1, #email2").on("keyup", function(){
        // 1.현재 이벤트 대상 아이디 읽어오기
        let cid = $(this).attr("id");

        // 2.현재 입력된 값 읽어오기
        let cv = $(this).val();

        console.log("입력아이디 : ", cid, "\n 입력값 : ", cv);

        // 3.이메일 뒷주소 세팅하기
        let backeml = cid === "email1" ? seleml.val() : eml2.val();
        // 현재 아이디가 "email1"인가? 맞으면 선택박스 : 아니면 두번째 이메일 뒷주소를 입력하는 중이므로 그것을 가져와서 할당하기

        // 변수 = 조건연산자
        // 변수 = 조건식 ? 값1 : 값2;

        // 4.만약 선택박스값이 "free"(직접입력)이면 이메일 뒷주소로 변경함!
        if(seleml.val() === "free") backeml = eml2.val();

        // 5.이메일 전체 주소 조합하기
        let comp = eml1.val() + "@" + backeml;

        // 6.이메일 유효성 검사 함수 호출하기
        resEml(comp);

    }); /////////// keyup 이벤트 //////////////////





    /****************************************************
        함수명 : resEml
        기능 : 이메일 검사 결과 처리
    ****************************************************/
    const resEml = (comp) => {
        // comp : 완성된 이메일 주소
        console.log("완성된 이메일 주소 : ", comp);
        console.log("이메일 검사 결과 : ", vReg(comp, "eml"));

        // 이메일 정규식 검사에 따른 메시지 보이기
        if(vReg(comp, "eml")){
            eml1.siblings(".msg").text("적합한 이메일 형식입니다!")
            .addClass("on");

        } /////////// if : 통과시 /////////////
        else{
            eml1.siblings(".msg").text("맞지 않는 이메일 형식입니다!")
            .removeClass("on");

            // 불통과!
            pass = false;
        } /////////// else : 불통과시 ///////////////
        

    }; /////////// resEml 함수 끝 (화살표 익명 함수로 할당형 함수 만듦) //////////////////



    /**************************************************************
        가입하기(submit)버튼을 클릭시 처리하기
        _______________________________________
        전체 검사의 원리
        -전역변수 pass를 설정하여 true를 할당하고 검사 중간에 불통과 사유 발생시
        false로 변경!
        -유효성 검사 통과 여부를 판단한다!
        
        -검사방법:
        기존 이벤트 blur 이벤트를 강제로 발생시킨다!
        이벤트를 강제 발생시키는 메서드는?
        ->>>> trigger(이벤트명) 메서드!

    **************************************************************/
    // 검사용 변수 : 다른 곳에서도 쓰려고 전역화 시킴
    let pass = true;

    // 이벤트 대상 : #btnj
    // 원래 서브밋버튼은 클릭하면 감싸고있는 form태그의 action설정 페이지로 
    // 모든 입력 창의 값을 전송하도록 설계됨
    // ->기본 서브밋 이동을 막고 우리가 검사 후 전송한다!
    $("#btnj").click(e=>{
        // 호출 확인
        console.log("가입해!");

        // 1.기본이동 막기
        e.preventDefault();

        // 2.pass 통과여부 변수에 true를 할당!
        // 처음에 true로 시작하여 검사 중간에 한번이라도 false로 할당되면 결과는 false다!!
        pass = true;
        
        // 3.입력창 blur 이벤트 강제 발생시키기
        // 대상 : blur이벤트 발생했던 요소들
        $(`input[type=text][id!=email2][class!=search],
        input[type=password]`).trigger("blur");

        // 최종 통과 여부
        console.log("통과 여부 : ", pass);

        // 4.검사결과에 따라서 메시지 보이기
        if(pass){
            /******************************************************************
                [ Ajax를 이용한 POST방식으로 DB에 데이터 입력하기! ]

                AJAX = Asynchronous Javascript and XML

                - 비동기통신이란? 쉽게 말해서 페이지가 새로고쳐지지 않고
                그대로 있으면서 일부분만 서버통신을 하는 것을 말한다!
                - 제이쿼리는 POST방식으로 ajax를 할 수 있다!

                [ POST방식 Ajax 메서드 ]
                $.post(URL,data,callback)
                $.post(전송할페이지,전송할데이터,전송후실행함수)
            
            ******************************************************************/
            $.post(
                // 1.전송할 페이지 : 서브밋할 페이지 (html에 action으로 써둔 것과는 별도로 내가 설정해야함!)
                "./process/ins.php",
                // 2.전송할 데이터 : 객체 형식{속성:값, ...}으로 작성
                {
                    // 1.아이디
                    "mid":$("#mid").val(),
                    // 2.비밀번호
                    "mpw":$("#mpw").val(),
                    // 3.이름
                    "mnm":$("#mnm").val(),
                    // 4.성별
                    "gen":$(":radio[name=gen]:checked").val(),
                    // 5.이메일 앞주소
                    "email1":$("#email1").val(),
                    // 6.이메일 뒷주소(선택박스)
                    "seleml":$("#seleml").val(),
                    // 7.이메일 뒷주소(직접입력)
                    "email2":$("#email2").val(),
                },
                // 3.전송 후 실행 함수 : 
                // 익명함수로 실행 후 결과 리턴 받음
                // ->이 부분이 Promise 처리된 것임
                function(res){ // res : 리턴된 결과 받는 변수
                    console.log(res);
                    // 성공시
                    if(res === "ok"){
                        alert("회원 가입을 축하드립니다! 짝짝짝!");
                        location.replace("login.php");
                    } //////////// if : 성공시 ///////////////////
                    else{
                        // 에러 발생시
                        alert("관리자에게 문의하세요~!\n" + res);
                    } /////////// else : 실패시 /////////////////
                } ////////////////// 결과처리 함수 ////////////////////////
                


            ); ////////////////// post 메서드 //////////////////////






            // 일단 페이지 테스트를 위해 기본 서브밋 해준다!
            // $(".logF").submit();
            // submit() : 폼요소를 서브밋해주는 메서드 (js에도 있음)

            // 원래는 post방식으로 DB에 회원가입 정보를 전송하여, 입력 후 DB처리 완료시 성공 메시지나 로그인 페이지로 넘겨준다!
            // alert("회원 가입을 축하드립니다! 짝짝짝!");
            // 로그인 페이지로 리디렉션
            // location.href = "login.html";
            // 🌈🌈주의!! location으로 넘기면 회원가입 페이지의 캐싱이 남아있게 되어서 위험하다!!!🌈🌈
            // location.replace("login.html");
            // 브라우저 캐싱 히스토리를 지우려면 'location.replace(url)'를 사용한다!!
            // : 다 지운건 아니고,, 바로 그자리에서 덮어씌우기때문에 바로 직전?의 그것만 지워버리나봐~

        } /////////// if : 통과시 //////////////
        else{
            alert("입력을 수정하세요~!");
        } ////////// else : 불통과시 /////////////

    }); //////////// click ///////////////



}); ////////////////// jQB /////////////////////



//////////////// 🌈정규 표현식🌈 //////////////////////
/*////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
    참고사이트 : https://www.w3schools.com/jsref/jsref_obj_regexp.asp
*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디(뭘 검사할지 아이디를 보낸대)
    // //console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg =
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!
} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////