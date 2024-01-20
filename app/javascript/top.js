// カレントユーザのまたはデフォルトのセクションを開始時刻順に取得する
const sectionElement = document.getElementById("jscurrentsection");
const sections = JSON.parse(sectionElement.dataset.sections).sort((a, b) => a.start_time.localeCompare(b.start_time));

// チャイムを鳴らす時刻を取得する
const chimeEnabledSections = sections.filter((section) => section.chime_enabled == true);
const chimeTimes = [].concat(...chimeEnabledSections.map((section)=>[section.start_time, section.end_time]));

// 現在時刻(hh:mm:ss)を取得する関数
/// 表示するために取得する場合はdisplayTime、単に値として取得したい場合はdataTimeを引数に渡す。
function obtainTime(which) {
  const now = new Date();

  /// 時、分、秒を0埋めして取得
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

// 時計の表示を更新する関数
function updateDisplayClock() {
  const clockElement = document.getElementById("jsclock");

  clockElement.textContent = obtainTime("displayTime");

  setTimeout(updateDisplayClock, 1000);
}

// 現在のセクションを取得する関数
function obtainCurrentSection(){
  const nowDataTime = obtainTime("dataTime");
  const currentSection = sections.find((section) => 
    section.start_time <= nowDataTime && section.end_time > nowDataTime
  );
  return currentSection;
}

// 直近の次のセクションを取得する関数
function obtainNextSection() {
  const nowDataTime = obtainTime("dataTime");
  const nextSection = sections.find((section) => section.start_time > nowDataTime) || sections[0];
  return nextSection;
}

// セクションの表示を更新する関数
function updateDisplaySection(){
  const currentSection = obtainCurrentSection()
  if (currentSection) {
    sectionElement.textContent = `name: ${currentSection.name}, start_time: ${currentSection.start_time.substring(0,5)}, end_time: ${currentSection.end_time.substring(0,5)}`;
  } else {
    const nextSection = obtainNextSection();
    /// start_timeの時と分だけ取得したいけどいい関数が思いつかないので妥協
    sectionElement.textContent = `name: -, next_start_time: ${nextSection.start_time.substring(0,5)}`;
  }

  setTimeout(updateDisplaySection, 1000);
}

// チャイムを鳴らす関数
/// chime_enabledがtrueのセクションのstart_time時とend_time時にチャイムを鳴らす
function playChime(){
  const chime = new Audio("/assets/Japanese_School_Bell02-01(Slow-Long).mp3");
  const nowDataTime = obtainTime("dataTime");

  /// "チャイムを鳴らす時刻"の中に現在時刻があるかどうかチェック
  const isMatch = chimeTimes.find((chimeTime) => chimeTime == nowDataTime);

  if (isMatch) { chime.play(); };

  setTimeout(playChime, 1000);
}

updateDisplayClock();
updateDisplaySection();
playChime();
