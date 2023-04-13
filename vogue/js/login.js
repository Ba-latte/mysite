/* 보그 PJ 로그인 페이지 JS - login.js */

/////////////// 제이쿼리 로딩 구역 /////////////////////
$(()=>{

    /*****************************************************
        로그인 페이지 유효성 검사하기
    *****************************************************/
    // 검사 대상 : #mid, #mpw
    const mid = $("#mid");
    const mpw = $("#mpw");

    // 유효성 검사 기준 : 전송할 때 아이디, 비번 모두 빈값이 없어야 함

    // 이벤트 대상 : #sbtn
    // 이벤트 종류 : click
    $("#sbtn").click(function(e){
        // 기본기능 막기(서브밋 기능 차단)
        e.preventDefault();

        // 공백 데이터 처리하기
        const  groSpce = val => val.replace(/\s/g, "");
        $





        // 유효성 검사하기
        // 아이디 비번 중 하나라도 비어있으면 불통과!
        if(groSpce(mid.val()) === "" || groSpce(mpw.val()) === ""){
            alert("모두 넣으시오~!");
            // 초기화 + 아이디에 포커스
            mid.val("").focus();
            mpw.val("");
        }
        else{
            // 통과시 //
            // 원래는 DB에서 조회된 결과를 받고 성공 메시지를 보이거나 첫 페이지로 보내준다!
            alert("로그인에 성공하였습니다!");


        }

    }); ////////// click 이벤트 ////////////////








}); //////////////// jQB ////////////////////