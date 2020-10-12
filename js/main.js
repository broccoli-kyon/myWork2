"use strict"
const weeks = ["Sun 日", "Mon 月", "Tue 火", "Wed 水", "Thu 木", "Fri 金", "Sat 土"];
const date = new Date();    //Dateオブジェクトを宣言・代入
let year = date.getFullYear();    //年を取得
let month = date.getMonth() + 1;  //月を取得（0-11で表現されるので1を足す）

//カレンダーを作成
function showCalendar(year, month) {
        const calendarHtml = createCalendar(year, month);
        const sec = document.createElement("section");
        sec.innerHTML = calendarHtml;
        
        document.getElementById("calendar").appendChild(sec);
        
        month++;
        if(month > 12) {
            year++;
            month = 1;
        }
}

function createCalendar(year, month){
    const startDate = new Date(year, month - 1, 1); //月の最初の日
    const endDate = new Date(year, month, 0);	//月の最後の日を取得
    const endDayCount = endDate.getDate();	//月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0);  // 前月の最後の日の情報
    const lastMonthEnddayCount = lastMonthEndDate.getDate();    //前月の末日の曜日
    const startDay = startDate.getDay();	//月の最初の日の曜日(0-6)を取得
    let dayCount = 1;	//日にちのカウント
    let dispMonth = ("0" + month).slice(-2);    //一桁の月は0を加える
    let calendarHtml = ""	//HTMLを組み立てる変数
    calendarHtml += "<p class='disp-year'>" + year + "." + dispMonth + "</p>";
    calendarHtml += "<table>";
    
    //曜日の行を作成
    for(let i = 0; i < weeks.length; i++) {
    	calendarHtml += "<th>" + weeks[i] + "</th>";
    }                                       
    
    for(let j = 0; j < 6; j++) {
    	calendarHtml += "<tr>";
    	
    	for(let k = 0; k < 7; k++) {
    	 	if(j === 0 && k < startDay) {
    	 	    //一行目で1日の曜日の前
    	 	    let num = lastMonthEnddayCount - startDay + k + 1;
    	 	    calendarHtml += "<td class='is-disabled'>" + num + campaign(num) + dayOff(k) + "</td>";
    	 	} else if(dayCount > endDayCount) {
    	 	    //末尾の日数を超えた
    	 	    let num = dayCount - endDayCount;
    	 	    calendarHtml += "<td class='is-disabled'>" + num + campaign(num) + dayOff(k) +  "</td>";
    	 	    dayCount++;
    	 	} else {
    	 	    calendarHtml += "<td>" + dayCount + campaign(dayCount) + dayOff(k) +  "</td>";
    	 	    dayCount++;
    	 	}
    	}
    	calendarHtml += '</tr>';
    }
    calendarHtml += "</table>" ;
    
    return calendarHtml;
    
}

//8の付く日キャンペーン
function campaign(val) {
  if(val === 8) {
    const camp = "<p class='coffee'>" + "コーヒー豆増量デー！" + "</p>";
    return camp;
  } else {
    return "";
  }
}

//各店舗の定休日
function dayOff(val) {
  switch(val) {
    case 2:
      const closeT = "<p class='off'>" + "時津店定休日" + "</p>";
      return closeT;
      break;
    case 4:
      const closeN = "<p class='off'>" + "長崎店定休日" + "</p>";
      return closeN;
      break;
    default:
      return "";
      break;
  }
}

function moveCalendar(e) {  //eはeventのe（つまりここではclickのこと）
    document.getElementById("calendar").innerHTML = "";
    if(e.target.id === "prev") {
        month--;
        if(month < 1) {
            year--;
            month = 12;
        }
    }
    if(e.target.id === "next") {
        month++;
        if(month > 12) {
            year++;
            month = 1;
        }
    }
    showCalendar(year, month);
}

document.getElementById("prev").addEventListener("click", moveCalendar);
document.getElementById("next").addEventListener("click", moveCalendar);
               
showCalendar(year, month);
