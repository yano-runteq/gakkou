/*
- 汎用変数/汎用関数
- その他の処理
- assets関連
- start-up関数群
- everySecondに関する関数群
  - 時計に関する関数
  - セクション表示に関する関数
  - セクション更新チェックに関する関数
    - 特定の処理群
- start-upの処理の実行
*/

/* -----------    汎用変数/汎用関数    ----------- */
// 適用中のtimetableのsections（開始時刻順）
const sectionsDataEl = document.getElementById("jsSectionsData");
const sections = JSON.parse(sectionsDataEl.dataset.sections).sort( (a, b) => a.start_time.localeCompare(b.start_time) );

// 関数：現在時刻を取得
function obtainTheTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");  /// 時を0埋めして取得
  const minutes = now.getMinutes().toString().padStart(2, "0");  /// 分を0埋めして取得
  const seconds = now.getSeconds().toString().padStart(2, "0");  /// 秒を0埋めして取得
  return `${hours}:${minutes}:${seconds}`;
}
let theTime = obtainTheTime();

// 関数：カレントセクションを取得
function obtainCurrentSection() {
  theTime = obtainTheTime();
  return sections.find( (section) => section.start_time <= theTime && section.end_time > theTime );
}
let currentSection = obtainCurrentSection();

// 関数：待機
function sleep(waitTimeMilliSeconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, waitTimeMilliSeconds);
  });
};



/* -----------    assets関連    ----------- */
// 音量スライダーの表示・非表示
const volumeButtonEl = document.getElementById("volumeButton");
const volumeControllerEl = document.getElementById("volumeController");
function existRight(el) { el.style.right = "-400%"; }
/// 音量アイコンクリック時、音量スライダーを表示・非表示
volumeButtonEl.addEventListener("click", () => {
  if (volumeControllerEl.style.opacity == 0) {
    volumeControllerEl.style.right = 0;
    volumeControllerEl.style.opacity = 1;
  } else {
    volumeControllerEl.style.opacity = 0;
    setTimeout(existRight, 200, volumeControllerEl);
  }
})
/// 音量スライダーの要素外をクリック時、音量スライダー要素を非表示
document.addEventListener("click", (e) => {
  if (!e.target.closest("#volumeController") && e.target !== volumeButtonEl) { 
    volumeControllerEl.style.opacity = 0;
    setTimeout(existRight, 200, volumeControllerEl);
  }
})

// チャイム設定
/// 音色
const chime = new Audio("/assets/Japanese_School_Bell02-01(Slow-Long).mp3");
/// 初期音量
const inputChimeVolume = document.getElementById("chimeVolume");
const defaultChimeVolume = inputChimeVolume.value;
chime.volume = defaultChimeVolume;
/// 音量スライダー
inputChimeVolume.addEventListener("input", (e) => {
  chime.volume = e.currentTarget.value;
});

// BGM
/// 初期BGM
function setCurrentBgm() {
  let bgmPath;
  if (currentSection) {
    bgmPath = (currentSection.bgm) ? `/assets/${currentSection.bgm}` : "/assets/00_default_music(cut).mp3";
  } else {
    bgmPath = "/assets/00_default_music(cut).mp3";
  }
  return new Audio(bgmPath);
}
let bgm = setCurrentBgm();
/// 初期音量
const inputBgmVolume = document.getElementById("bgmVolume");
const defaultBgmVolume = inputBgmVolume.value;
bgm.volume = defaultBgmVolume;
/// 音量スライダー
let temporaryEnabled = false;
let latestBgmVolume;
inputBgmVolume.addEventListener("input", (e) => {
  if (temporaryEnabled) {return;}  /// フェードイン・アウト中は音量スライダーを無効
  bgm.volume = e.currentTarget.value;
  latestBgmVolume = bgm.volume;
});

// 背景画像
/// 背景要素
const body = document.querySelector("body");
/// 初期背景画像(を表示)
function displayCurrentBackgroundImage() {
  let currentBackgroundImagePath;
  if (currentSection) {
    currentBackgroundImagePath = (currentSection.background_image) ? `/assets/${currentSection.background_image}` : "/assets/1518375S.jpg";
  } else {
    currentBackgroundImagePath = "/assets/1518375S.jpg";
  }
  body.style.backgroundImage = "url(" + currentBackgroundImagePath + ")";
}
displayCurrentBackgroundImage();



/* -----------    start-up関数群    ----------- */
// 関数：特定の処理を毎秒実行
function everySecond() {
  theTime = obtainTheTime();
  currentSection = obtainCurrentSection();

  displayClock();
  displaySection();
  checkSectionUpdated();

  setTimeout(everySecond, 1000);
}

// 関数：BGMを開始
function startLoopBgm() {
  bgm = setCurrentBgm();
  bgm.load();  /// `loopPlay()`内の`bgm.duration`のために必要

  loopPlay();
  fadeInBgm();  /// 「everySecondに関する関数群」-「セクション更新チェックに関する関数」-「"特定の処理"群」より
}

  // 関数：BGMをループ再生
  let loopPlayTimer;
  function loopPlay() {
    bgm.play();
    bgm.currentTime = 0;
    loopPlayTimer = setTimeout(loopPlay, bgm.duration*1000);
  }

  // 関数：BGMのループ再生を停止
  function stopLoopBgm() {
    clearTimeout(loopPlayTimer);
  }



/* -----------    everySecondに関する関数群    ----------- */
  /* -----------    時計に関する関数    ----------- */
  // 関数：時計を表示
  function displayClock() { 
    const clockEl = document.getElementById("jsClock");
    clockEl.textContent = theTime;
  }

  /* -----------    セクション表示に関する関数    ----------- */
  // 関数：セクションを表示
  function displaySection() {
    const currentsectionNameEl = document.getElementById("jsCurrentsectionName");
    const currentsectionStartEndEl = document.getElementById("jsCurrentsectionStartEnd");

    if (currentSection) {
      currentsectionNameEl.textContent = `${currentSection.name}`;
      currentsectionStartEndEl.textContent = `start: ${currentSection.start_time.substring(0,5)} ~ ${currentSection.end_time.substring(0,5)} :end`;
    } else {
      /// 現在時刻がどのセクションにも含まれていない場合、直近で次のセクションを表示
      const nextSection = sections.find( (section) => section.start_time > theTime ) || sections[0];
      currentsectionNameEl.textContent = `-`;
      currentsectionStartEndEl.textContent = `次セクション：${nextSection.start_time.substring(0,5)}`;  /// start_timeの時と分だけ取得したいけどいい関数が思いつかないので妥協
    }
  }

  /* -----------    セクション更新チェックに関する関数    ----------- */
  // 関数：セクションが更新されたかどうかを確認、更新された場合、"特定の処理"群を実行
  async function checkSectionUpdated() {
    /// 現在時刻が、チャイムの有効なセクションのstart_timeまたはend_timeと一致するか
    const chimeEnabledSections = sections.filter( (section) => section.chime_enabled == true );
    const chimeTimes = [].concat(...chimeEnabledSections.map( (section) => [section.start_time, section.end_time] ));
    const isMatchChimeEnabledTimes = chimeTimes.find( (chimeTime) => chimeTime == theTime );

    /// 現在再生中のBGMがカレントセクションのBGMと異なるかどうか
    const currentBgmPath = bgm.src;
    let nextBgm;
    if (currentSection) {
      nextBgm = (currentSection.bgm) ? new Audio(`/assets/${currentSection.bgm}`) : new Audio("/assets/00_default_music(cut).mp3");
    } else {
      nextBgm = new Audio("/assets/00_default_music(cut).mp3");
    }
    const nextBgmPath = nextBgm.src;

    /// 現在時刻が、任意のセクションのstart_timeまたはend_timeと一致するか
    const startOrEndTimes =  [].concat(...sections.map( (section) => [section.start_time, section.end_time] ));
    const isMatchStartOrEndTimes = startOrEndTimes.find( (startOrEndTime) => startOrEndTime == theTime );

    /// セクションの更新に起因した変化を確認・実行
    if (isMatchChimeEnabledTimes) {
      await fadeOutBgm();
            changeBackgroundImage();
            temporaryEnabled = true;
      await playChime();
      await sleep(2000);
            temporaryEnabled = false;
            stopLoopBgm();
            startLoopBgm(); /// BGMをセットしなおし再生
    } else if (isMatchStartOrEndTimes && (currentBgmPath !== nextBgmPath)) {
      await fadeOutBgm();
            changeBackgroundImage();
            stopLoopBgm();
            startLoopBgm();
    } else if (isMatchStartOrEndTimes) {
            changeBackgroundImage();
    }
  }

    /* -----------    "特定の処理"群    ----------- */
    // 関数：BGMをフェードアウト
    function fadeOutBgm() {
      if (bgm.paused) {return;}

      temporaryEnabled = true;  /// フェードアウト中、BGMの音量スライダーを無効化

      const startVolume = bgm.volume;
      const fadeOutTime = 5000;  /// フェードアウトにかける時間（ミリ秒）
      const perSeconds = 10;  /// 音量変化の傾き
      let remainingTime = fadeOutTime;

      /// フェードアウト機構
      return new Promise ( (resolve) => {
        const interval = setInterval(function () {
          bgm.volume = (remainingTime/fadeOutTime)*startVolume;
          remainingTime -= perSeconds;
          if (remainingTime<=0) {
            clearInterval(interval);
            bgm.volume = 0;
            bgm.pause();
            temporaryEnabled = false;
            resolve();
          }
        }, perSeconds);
      })
    }

    // 関数：（必要な場合）背景画像を変更
    function changeBackgroundImage() {
      const oldBackgroundImage = body.style.backgroundImage;  /// => url("assets/~~~.jpg")
      let newBackgroundImagePath;
      if (currentSection) {
        newBackgroundImagePath = (currentSection.background_image) ? `/assets/${currentSection.background_image}` : "/assets/1518375S.jpg";
      } else {
        newBackgroundImagePath = "/assets/1518375S.jpg";
      }
      const newBackgroundImage = "url("+ newBackgroundImagePath +")";  /// => url(assets/~~~.jpg)

      if (newBackgroundImage!=oldBackgroundImage) {
        body.style.backgroundImage = newBackgroundImage;
      }
    }

    // 関数：チャイムを再生
    function playChime() {
      return new Promise ( (resolve) => {
        chime.addEventListener("ended", () => {resolve();});
        chime.play();
      });
    }

    // 関数：BGMをフェードイン
    function fadeInBgm() {
      temporaryEnabled = true;  /// フェードイン中、BGMの音量スライダーを無効化

      const finishVolume = (latestBgmVolume !== undefined) ? latestBgmVolume : defaultBgmVolume;  /// 音量スライダーを一度でも動かしている場合 : 一度も動かしていない場合
      const fadeInTime = 5000;  /// フェードインにかける時間（ミリ秒）
      const perSeconds = 10;  /// 音量変化の傾き
      let elapsedTime = 0;
      bgm.volume = 0;
      bgm.play();

      /// フェードイン機構
      return new Promise ( (resolve) => {
        const interval = setInterval(function () {
          bgm.volume = (elapsedTime/fadeInTime)*finishVolume;
          elapsedTime += perSeconds;
          if (1<=(elapsedTime/fadeInTime)) {
            clearInterval(interval);
            bgm.volume = finishVolume;
            temporaryEnabled = false;
            resolve();
          }
        }, perSeconds);
      })
    }



/* -----------    start-upの処理を実行    ----------- */

everySecond();
let checkClicked;
document.addEventListener("click", function() {
  if (checkClicked) { return; }
  startLoopBgm();
  checkClicked = true;
});
