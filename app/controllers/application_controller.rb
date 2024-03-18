class ApplicationController < ActionController::Base



  def default_sections
    # ユーザー作成時用または非ログイン時用のセクション
    # デフォルトのセクションは計19
    sections = [{
      name:"夜更け",start_time:"00:00:00",end_time:"04:30:00",chime_enabled:false,background_image:"bgi_midnight.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"明け方",start_time:"04:30:00",end_time:"06:30:00",chime_enabled:false,background_image:"bgi_dawn.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"朝",start_time:"06:30:00",end_time:"08:00:00",chime_enabled:false,background_image:"bgi_morning.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"登校時間",start_time:"08:00:00",end_time:"08:45:00",chime_enabled:true,background_image:"bgi_stundentscoming.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"１時間目",start_time:"08:45:00",end_time:"09:35:00",chime_enabled:true,background_image:"bgi_firstsection.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"休み時間",start_time:"09:35:00",end_time:"09:45:00",chime_enabled:true,background_image:"bgi_firstbreak.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"２時間目",start_time:"09:45:00",end_time:"10:35:00",chime_enabled:true,background_image:"bgi_secondsection.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"休み時間",start_time:"10:35:00",end_time:"10:45:00",chime_enabled:true,background_image:"bgi_secondbreak.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"３時間目",start_time:"10:45:00",end_time:"11:35:00",chime_enabled:true,background_image:"bgi_thirdsection.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"休み時間",start_time:"11:35:00",end_time:"11:45:00",chime_enabled:true,background_image:"bgi_thirdbreak.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"４時間目",start_time:"11:45:00",end_time:"12:35:00",chime_enabled:true,background_image:"bgi_forthsection.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"昼休み",start_time:"12:35:00",end_time:"13:25:00",chime_enabled:true,background_image:"bgi_lunchtime.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"５時間目",start_time:"13:25:00",end_time:"14:15:00",chime_enabled:true,background_image:"bgi_fifthsection.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"休み時間",start_time:"14:15:00",end_time:"14:25:00",chime_enabled:true,background_image:"bgi_fifthbreak.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"６時間目",start_time:"14:25:00",end_time:"15:15:00",chime_enabled:true,background_image:"bgi_sixthsection.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"放課後",start_time:"15:15:00",end_time:"17:30:00",chime_enabled:true,background_image:"bgi_afterschool.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"下校時刻",start_time:"17:30:00",end_time:"18:30:00",chime_enabled:true,background_image:"bgi_timetogohome.jpg",bgm:"02_babel_music(cut).mp3"
    },
    {
      name:"また明日",start_time:"18:30:00",end_time:"21:00:00",chime_enabled:false,background_image:"bgi_seeyoutomorrow.jpg",bgm:"01_netsuijo_music(cut).mp3"
    },
    {
      name:"夜",start_time:"21:00:00",end_time:"23:59:59",chime_enabled:false,background_image:"bgi_night"
    }]
  end
end
