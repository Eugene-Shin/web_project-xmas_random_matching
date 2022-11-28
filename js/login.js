$(function(){
    var cookie_user_id = getLogin(); //쿠키값 가져오기

    //쿠키값 존재할 시 id에 쿠키에서 가져온 id 할당
    //체크박스를 체크상태로 변경
    if(cookie_user_id != ""){
        $("#id").val(cookie_user_id);
        $("#checkid").attr("checked",true);
    }

    //아이디 저장 체크 시
    $("#checkid").on("click",function(){
        var _this = this;
        var isRemembered;

        if($(_this).is(":checked")){
            isRemembered = confirm("로그인 정보를 저장하시겠습니까?");

            if(!isRemembered)
                $(_this).attr("checked",false);
        }
    });

    //로그인 버튼 클릭 시
    $("#log-in").on("click",function(){
        if($("checkid").is(":checked")){ //저장 체크 시
            saveLogin($("#temp_id").val());
        } else{ //체크 해제 시 공백
            saveLogin("");
        }
    });
});

//saveLogin 함수, 로그인 정보 저장
function saveLogin(id){
  if(id != ""){ //7일간 userid 쿠키에 id 값 저장
    setSave("userid", id, 7);
  } else{ //userid 쿠키 삭제
    setSave("userid", id, -1);
  }
}

//setSave 함수, 쿠키에 id 저장
function setSave(name, value, expiredays){
  var today = new Date();
  today.setDate(today.getDate()+expiredays);
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";"
}

//getLogin 함수, 쿠키값 가져오기
function getLogin(){
  //userid 쿠키에서 id 값 가져오기
  var cook = document.cookie + ";";
  var idx = cook.indexOf("userid",0);
  var val = "";

  if(idx!=-1){
    cook = cook.substring(idx, cook.length);
    begin = cook.indexOf("=", 0) + 1;
    end = cook.indexOf(";", begin);
    val = unescape(cook.substring(begin,end));
  }
  return val;
}