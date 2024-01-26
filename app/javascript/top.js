// rootページの実装が完了したら整理します。

let temporaryEnabled = false;
let latestBgmVolume;

// カレントユーザのまたはデフォルトのセクションを開始時刻順に取得する
const sectionElement = document.getElementById("jscurrentsection");
const sections = JSON.parse(sectionElement.dataset.sections).sort((a, b) => a.start_time.localeCompare(b.start_time));

// チャイムを鳴らす時刻を取得する
const chimeEnabledSections = sections.filter((section) => section.chime_enabled == true);
const chimeTimes = [].concat(...chimeEnabledSections.map((section)=>[section.start_time, section.end_time]));

// チャイムの音
const chime = new Audio("/assets/Japanese_School_Bell02-01(Slow-Long).mp3");
const inputChimeVolume = document.getElementById("chimevolume");
const defaultChimeVolume = inputChimeVolume.value;
chime.volume = defaultChimeVolume;

// BGM
const bgmPath = (obtainCurrentSection.bgm) ? obtainCurrentSection.bgm : "/assets/VSQSE_0586_city_bird(loop)2.mp3";
const bgm = new Audio(bgmPath);
/// BGMのデフォルト音量を取得および適用
const inputBgmVolume = document.getElementById("bgmvolume");
const defaultBgmVolume = inputBgmVolume.value;
bgm.volume = defaultBgmVolume;

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
async function playChime(){
  const chimeEnabledSections = sections.filter((section) => section.chime_enabled == true);
  const chimeTimes = [].concat(...chimeEnabledSections.map((section)=>[section.start_time, section.end_time]));

  const nowDataTime = obtainTime("dataTime");

  const isMatch = chimeTimes.find((chimeTime) => chimeTime == nowDataTime);

  if (isMatch) { 
    fadeOut(bgm, 5000);
    chime.play();
    await sleep(25000); /// チャイムが鳴り終わるのを待つ
    await sleep(4000);
    fadeIn(bgm, 5000)
  };

  setTimeout(playChime, 1000);
}

// 音声をフェードインしながら再生する関数
function fadeIn(audio, milliSeconds) {
  ///　フェードアウト中、BGMの音量調節を無効にする
  temporaryEnabled = true;

  /// フェードイン完了時の音量値を取得
  //// 音量スライダーを動かしている場合はその値に、一度も動かしていない場合はデフォルト値に設定
  const finalVolume = (latestBgmVolume) ? latestBgmVolume : defaultBgmVolume;

  audio.volume = 0;
  audio.play();
  if (audio.paused) { return; }
  let elapsedTime = 0;
  
  /// フェードインにかける時間（ミリ秒）
  const fadeInTime = milliSeconds;

  /// フェードイン機構
  new Promise ((resolve) => {
    const interval = setInterval(function () {
      audio.volume = elapsedTime / fadeInTime;
      elapsedTime += 100;
  
      if ( finalVolume <= (elapsedTime / fadeInTime) ) {
        clearInterval(interval);
        audio.volume = finalVolume;
        temporaryEnabled = false;
      }
    }, 100);

    resolve();
  });
}

// 音声をフェードアウトする関数
function fadeOut(audio, milliSeconds) {
  if (audio.paused) { return; }

  ///　フェードアウト中、BGMの音量調節を無効にする
  temporaryEnabled = true;

  /// フェードアウトにかける時間（ミリ秒）
  const fadeOutTime = milliSeconds;
  let remainingTime = fadeOutTime * audio.volume;

  /// フェードアウト機構
  new Promise ((resolve) => {
    const interval = setInterval(function () {
      audio.volume = remainingTime / fadeOutTime
      remainingTime -= 100;
  
      if ( remainingTime <= 0 ) {
        clearInterval(interval);
        audio.volume = 0;
        audio.pause();
        temporaryEnabled = false;
      }
    }, 100);  

    resolve();
  });
}

// 処理を一時停止する関数
/// 引数に停止したい時間(ミリ秒)を渡して実行する
function sleep(waitTime) {
  return new Promise(function(resolve) {
    setTimeout(resolve, waitTime);
  });
};

// 音量スライダーの値に応じてBGMの音量を変更する
inputBgmVolume.addEventListener("input", (e) => {
  if (temporaryEnabled) { return; }
  bgm.volume = e.currentTarget.value;
  latestBgmVolume = bgm.volume;
});

// 音量スライダーの値にお応じてチャイムの音量を変更する
inputChimeVolume.addEventListener("input", (e) => {
  chime.volume = e.currentTarget.value;
});

// クリック時(音量確認に返答後)、BGMを鳴らす
let checkClicked = false; /// クリック時にBGMを鳴らすのは最初の一度だけにする。でないと、fadeOut終了かつチャイムの鳴っているあいだにクリックすると、音量スライダーによる音量調節(すなわちBGMの可聴化)が可能になってしまう。
if (!bgm.paused) { checkClicked = true; } /// 画面遷移後にBGMが正常に鳴っている場合、クリックによる再生を無効にする。
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("click", function() {
    if (checkClicked) { return; }
    if (bgm.paused) {
      playBgm();
      checkClicked = true;
    }
  });
});

// BGMを途切れさせずループにさせる関数
function playBgm() {
  ///ループ機構
  bgm.load(); //// `bgm.duration`のために必要

  const loopPlay = function(){
    bgm.play();
    bgm.currentTime = 0;
    setTimeout(loopPlay, bgm.duration*1000-10);
  };

  /// あるいは、BGM最後、数ミリ秒削除？

  loopPlay();
  fadeIn(bgm, 2000);
}

// 本アプリの他ページからtopページに画面遷移時、BGMを鳴らす
playBgm();

updateDisplayClock();
updateDisplaySection();
playChime();
