class Section < ApplicationRecord
  belongs_to :timetable

  validates :name, presence: true, length: { maximum: 255 }
  validates :start_time, presence: true
  validates :end_time, presence: true
end
