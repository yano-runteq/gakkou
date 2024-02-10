class ChangeDefaultOfBackgroundImageBlurEnabledOfSections < ActiveRecord::Migration[7.0]
  def change
    change_column_default :sections, :background_image_blur_enabled, false
  end
end
