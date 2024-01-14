class TopsController < ApplicationController
  def top
    # ログイン機能実装時に書き換え予定
    user = User.find_by(student_identification: "test")
    timetable = user.timetable
    @sections = timetable.sections
  end
end
