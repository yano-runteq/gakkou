class RenameBackgroundOfSections < ActiveRecord::Migration[7.0]
  def change
    rename_column :sections, :background, :background_image
  end
end
