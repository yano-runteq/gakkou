# gakkou

## サービス概要
"gakkou"は学校の空気感の再現を目的としたWebアプリです。
ユーザーがいつ訪問したかにかかわらず、定刻になるとチャイムが鳴ったり放課後になったりします。

## 想定されるユーザー層
学校(日本の小中学校・高等学校)に思い入れのある人

## サービスコンセプト
美術館や博物館、あるいは図書館の閉架書庫。
それらを想起して、「インターネットのどこかに学校のイデアみたいなものがあったらいいな」と思いました。
本アプリを考案しました。
本アプリ"gakkou"は、日本の学校(小中高)の空気感の再現を目的とし、「ユーザー非ユーザーを問わずただ存在しているだけで意味の生まれるアプリ」を目指しています。
そのため、主機能においては、ユーザーへの操作要求を極力排除し、一度訪問すればあとは開いているだけで基本自動で動作するような仕組みにするつもりです。
もっとも、それではすこしWebアプリとして味気なさすぎる気もするので、いわゆる実用性のある機能もあるいはおまけ程度に付け加えられたらなと思っています。

## 実装を予定している機能
### MVP
* トップページ
  * 背景の時間変化
    * ImageMagick・RMagickによるモザイク加工
  * BGMの時間変化
  * 表示(HR、授業中、休み時間、放課後、etc.)の時間変化
  * 夜間学校モード
* 概要・コンセプト
* 音量調節

### その後の機能
* サインアップ
* ログイン/ログアウト
  * モーダルウィンドウによるログイン
* 設定機能
  * 学校名の編集
  * チャイム音の変更
  * BGMの変更
  * 背景の変更
    * ImageMagick・RMagickによるモザイク率の変更
* 時間割機能
  * 各セクション(HR、授業、休み時間、etc.)の長さの編集
  * 各セクションの表示文字列の編集
