// 現在時刻(hh:mm:ss)を取得する関数
// 表示するために取得する場合はdisplayTime、単に値として取得したい場合はdataTimeを引数に渡す。
function whatTime(which) {
  const now = new Date();

  // 時、分、秒を0埋めして取得
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const displayTime = `${hours}:${minutes}`;
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

  clockElement.textContent = whatTime("displayTime");

  setTimeout(updateClock, 1000);
}


const sectionElement = document.getElementById("jscurrentsection");
const sections = JSON.parse(sectionElement.dataset.sections).sort((a, b) => a.start_time.localeCompare(b.start_time));

// 現在のセクションを更新(表示)する関数
function updateCurrentSection(){
  const nowDataTime = whatTime("dataTime");
  const currentSection = sections.find((section) => 
    section.start_time <= nowDataTime && section.end_time > nowDataTime
  );

  // 現在のセクションの情報を表示する / 現在時刻に対応するセクションのなかった場合、直近の次のセクションの情報を表示する
  if (currentSection) {
    // 現在のセクションの情報を表示する
    sectionElement.textContent = `name: ${currentSection.name}, start_time: ${currentSection.start_time}, end_time: ${currentSection.end_time}`
  } else {
    const nextSection = obtainNextSection();
    sectionElement.textContent = `name: -, next_start_time: ${nextSection.start_time}, next_section: ${nextSection.name}`
  };

  setTimeout(updateCurrentSection, 1000);
}

// 直近の次のセクションを取得する関数
function obtainNextSection() {
  const nowDataTime = whatTime("dataTime");
  var nextSection = sections.find((section) => section.start_time > nowDataTime);

  if (nextSection) {
    return nextSection
  } else {
    var nextSection = sections[0]
    return nextSection
  };
}


updateClock();
updateCurrentSection();
