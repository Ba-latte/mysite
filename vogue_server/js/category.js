// 보그 PJ 카테고리 페이지 JS - category.js //////

// 🌷1.넘어온 url 받기 : 넘어온 url은 로딩구역 밖에서 받아도 된다!
let pm = location.href;
// : location.href이 이퀄(=)의 오른쪽에 있으면 url주소를 읽어온다!
// : 여기서 "pm"은 parameter의 줄임말로 쓰셨음~ (전달값 변수 의미!)

// 2.문자열 잘라서 값으로 읽어오기
// : 위에 let pm에 할당할때 href의 바로 뒤에서... split()을 써서 잘라서 쓸 수는 없음!
// : 물음표로 잘라서 두번째 값, 이퀄로 잘라서 두번째 값을 가져오는 것임
pm = pm.split("?")[1].split("=")[1];

// 3.pm값 특수문자 복원하기 : 디코딩하기!
pm = decodeURIComponent(pm);

// 4.호출확인
console.log(pm);


////////////////////////////////////// 로딩 구역 ////////////////////////////////////////
window.addEventListener("DOMContentLoaded", loadFn);

////////////////////////// 로드 함수 //////////////////////////////
function loadFn(){

    console.log("로딩완료!");

    // 🌈1. 변경 대상 선정
    // (1) 서브 타이틀
    const stit = document.querySelector(".stit");
    // (2) 서브 메뉴
    const lnb = document.querySelector(".lnb");
    // (3) 내용 타이틀
    const contit = document.querySelectorAll(".icont h2");
    // (4) 컨텐츠 상위 박스(카테고리 클래스 넣기)
    const cont = document.querySelector(".cont");
    // (5) title요소 (타이틀 내용에 카테고리명을 앞에다가 넣기)
    const titag = document.querySelector("title");

    // console.log(stit, lnb, contit, cont, titag);

    // 2. 메뉴 데이터 (sinfo 변수)객체에서 카테고리값 선택하기
    const mdata = sinfo[pm];

    console.log(mdata);

    // 3. 대상에 변경 적용하기
    // (1) 카테고리 페이지 타이틀 넣기
    // 대상 : .stit -> stit 변수
    stit.innerText = mdata["제목"];
    // 위의 모양은 다른 데 들어가 있을 떄에는 별루~
    // stit.innerText = mdata["제목"];

    // (2) lnb 메뉴 넣기
    // 대상 : .lnb -> lnb변수
    // 코드 넣기 : <ul><li><a href="#">메뉴</a></li></ul>
    // 조건 : mdata["메뉴"] 값이 "없음"dlaus lnb를 지우고, 아니면 배열값으로 메뉴가 있으므로, 배열만큼 위의 ul>li>a 코드를 넣어준다!

    // 메뉴값 담기
    let mvalue = mdata["메뉴"];
    
    if(mvalue === "없음"){
        lnb.remove();
        // : lnb 태그를 제거하는 것임! (remove())
    }
    else{ // 메뉴가 배열에 있음!
        let temp = "<ul>";
        // 임시 변수 만들기 : 담아둘 공간 만들어 두는 것임

        // 메뉴 배열만큼 돌아서 코드 생성하기
        mvalue.forEach((val)=>{ // val은 배열값!
            temp += `
                <li>
                    <a href ="#">${val}</a>
                </li>
            `;
        }); ///////////////////// forEach() 문 끝 ///////////////////////

        temp += "</ul>";

        // lnb 박스에 html 넣기!
        lnb.innerHTML = temp;
    }

    // (3) 내용 타이틀 넣기 : contit 변수
    // - h2 개수 만큼 순번대로 mdata["타이틀"][순번]
    // - h2 돌릴 때 for of말고 forEach()메서드로 사용할것임!
    // forEach((요소, 순번, 배열전체)=>{코드});
    contit.forEach((ele, idx)=>{
        ele.innerHTML = mdata["타이틀"][idx];
    }); ////////////////////// forEach() 끝 //////////////////////////

    // (4) 컨텐츠 박스에 pm과 같은 이름의 class 넣기
    cont.classList.add(mdata["경로"]);
    // "경로"속성의 값이 실제 클래스명과 일치함!

    // 아래처럼 써도 됨
    // cont.classList.add(pm.replace(" & ", "-"));
    // replace(바뀔 값, 바꿀 값);


    // (5) 탭메뉴 출력 title요소 데이터 넣기
    // 기존 값을 살려서, 기존 값의 앞에 "제목" 속성값을 넣어준다!
    // 대상 : title요소 -> titag변수
    titag.innerText = mdata["제목"] + titag.innerText;


    
} //////////////////////// loadFn 함수 끝 ///////////////////////