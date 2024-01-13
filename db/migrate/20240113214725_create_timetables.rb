class CreateTimetables < ActiveRecord::Migration[7.0]
  def change
    create_table :timetables do |t|
      t.boolean :background_mosaic_enabled, default: false
      t.references :user,                                   null: false, foreign_key: true

      t.timestamps
    end
  end
end
