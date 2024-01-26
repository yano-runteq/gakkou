class ApplicationController < ActionController::Base



  def default_sections
    # ユーザー作成時用または非ログイン時用のセクション
    # デフォルトのセクションは計19
    sections = [{
      name:"夜更け",start_time:"00:00:00",end_time:"04:30:00",chime_enabled:false
    },
    {
      name:"明け方",start_time:"04:30:00",end_time:"06:30:00",chime_enabled:false
    },
    {
      name:"朝",start_time:"06:30:00",end_time:"08:00:00",chime_enabled:false
    },
    {
      name:"登校時間",start_time:"08:00:00",end_time:"08:45:00",chime_enabled:true
    },
    {
      name:"１時間目",start_time:"08:45:00",end_time:"09:35:00",chime_enabled:true
    },
    {
      name:"休み時間",start_time:"09:35:00",end_time:"09:45:00",chime_enabled:true
    },
    {
      name:"２時間目",start_time:"09:45:00",end_time:"10:35:00",chime_enabled:true
    },
    {
      name:"休み時間",start_time:"10:35:00",end_time:"10:45:00",chime_enabled:true
    },
    {
      name:"３時間目",start_time:"10:45:00",end_time:"11:35:00",chime_enabled:true
    },
    {
      name:"休み時間",start_time:"11:35:00",end_time:"11:45:00",chime_enabled:true
    },
    {
      name:"４時間目",start_time:"11:45:00",end_time:"12:35:00",chime_enabled:true
    },
    {
      name:"昼休み",start_time:"12:35:00",end_time:"13:25:00",chime_enabled:true
    },
    {
      name:"５時間目",start_time:"13:25:00",end_time:"14:15:00",chime_enabled:true
    },
    {
      name:"休み時間",start_time:"14:15:00",end_time:"14:25:00",chime_enabled:true
    },
    {
      name:"６時間目",start_time:"14:25:00",end_time:"15:15:00",chime_enabled:true
    },
    {
      name:"放課後",start_time:"15:15:00",end_time:"17:30:00",chime_enabled:true
    },
    {
      name:"下校時刻",start_time:"17:30:00",end_time:"18:30:00",chime_enabled:true
    },
    {
      name:"また明日",start_time:"18:30:00",end_time:"21:00:00",chime_enabled:false
    },
    {
      name:"夜",start_time:"21:00:00",end_time:"23:59:59",chime_enabled:false
    }]
  end
end
