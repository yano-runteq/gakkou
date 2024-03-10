class RemoveBackgroundMosaicEnabledFromTimetables < ActiveRecord::Migration[7.0]
  def up
    remove_column :timetables, :background_mosaic_enabled
  end

  def down
    add_column :timetables, :background_mosaic_enabled
  end
end
