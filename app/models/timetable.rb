class Timetable < ApplicationRecord
  belongs_to :user

  has_one :section, dependent: :destroy
end
