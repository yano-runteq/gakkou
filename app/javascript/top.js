// 現在時刻(hh:mm:ss)を取得する関数
// 表示するために取得する場合はdisplayTime、単に値として取得したい場合はdataTimeを引数に渡す。
function whatTime(which) {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 時, 分, 秒について1桁の場合に0を追加
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

// 時計を更新する関数
function updateClock() {
  const clockElement = document.getElementById("jsclock");
  const displayTime = whatTime("displayTime");

  clockElement.textContent = displayTime;

  setTimeout(updateClock, 1000);
}

// 時計を開始
updateClock();
