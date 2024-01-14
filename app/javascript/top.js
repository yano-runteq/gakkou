// 現在時刻(hh:mm:ss)を取得する関数
// 表示するために取得する場合はdisplayTime、単に値として取得したい場合はdataTimeを引数に渡す。
function whatTime(which) {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 時, 分, 秒について0埋め
  const displayHours = hours.toString().padStart(2, "0");
  const displayMinutes = minutes.toString().padStart(2, "0");
  const displaySeconds = seconds.toString().padStart(2, "0");

  const displayTime = `${displayHours}:${displayMinutes}`;
  console.log(`${displayHours}:${displayMinutes}:${displaySeconds}`); // 動作確認用コード

  const dataTime = `${hours}:${minutes}:${seconds}`;

  if (which === "displayTime") {
  return displayTime;
  }
  
  if (which === "dataTime") {
  return dataTime;
  } 
}

// 時計を更新(表示)する関数
function updateClock() {
  const clockElement = document.getElementById("jsclock");
  const displayTime = whatTime("displayTime");

  clockElement.textContent = displayTime;

  setTimeout(updateClock, 1000);
}

// 現在のセクションを更新(表示)する関数
const sectionElement = document.getElementById("jscurrentsection");
const sections = JSON.parse(sectionElement.dataset.sections).sort((a, b) => a.start_time.localeCompare(b.start_time));
function updateCurrentSection(){
  // 現在のセクションを取得（start_time以上-end_time未満の範囲に現在時刻のあるセクション）
  const nowDataTime = whatTime("dataTime");
  const currentSection = sections.find((section) => 
    // time型を"%H:%M:%S"の形に一発変換できるコードが思いつかないので、時刻部分を切り離し取得する姑息な処理で妥協
    section.start_time.split("T")[1].substring(0, 8) <= nowDataTime && section.end_time.split("T")[1].substring(0, 8) > nowDataTime
  );

  if (currentSection) {
    // 現在のセクションの情報を表示する
    sectionElement.textContent = `name: ${currentSection.name}, start_time: ${currentSection.start_time}, end_time: ${currentSection.end_time}`
  } else {
    // 現在時刻に対応するセクションのなかった場合、直近の次のセクションを取得しその情報を表示する
    const nextSection = sections.find((section) =>
      section.start_time.split("T")[1].substring(0, 8) >= nowDataTime
    );
    sectionElement.textContent = `name: -, next_start_time: ${nextSection.start_time}`
  }

  setTimeout(updateCurrentSection, 1000);
}

updateClock();
updateCurrentSection();
