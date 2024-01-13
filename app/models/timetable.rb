class Timetable < ApplicationRecord
  belongs_to :user

  has_many :section, dependent: :destroy
end
