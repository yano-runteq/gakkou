class AddBackgroundImageBlurEnabledToSections < ActiveRecord::Migration[7.0]
  def change
    add_column :sections, :background_image_blur_enabled, :boolean
  end
end
