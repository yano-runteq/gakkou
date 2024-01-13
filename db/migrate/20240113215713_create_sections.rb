class CreateSections < ActiveRecord::Migration[7.0]
  def change
    create_table :sections do |t|
      t.string :name,                            null: false
      t.time :start_time,                        null: false
      t.time :end_time,                          null: false
      t.boolean :chime_enabled, default: false
      t.string :background
      t.string :bgm
      t.references :timetable,                   null: false, foreign_key: true

      t.timestamps
    end
  end
end
