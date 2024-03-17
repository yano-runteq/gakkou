class TopsController < ApplicationController
  before_action :verify_volume_enabled, only: %i[top]

  def top
    # ログイン機能実装時に書き換え予定
    @sections = default_sections
    @default_bgm_volume_value = cookies[:bgm_volume_value]
    cookies[:chime_volume_value].blank? ? @default_chime_volume_value = 0.5 : @default_chime_volume_value = cookies[:chime_volume_value]
  end

  def verify_volume
    if cookies[:bgm_volume_value].present?
      redirect_to root_path
    end
  end

  def verify_yes
    write_volume_enabled_cookie(0.5)
    redirect_to root_path
  end

  def verify_no
    write_volume_enabled_cookie(0.0)
    redirect_to root_path
  end

  private

  def verify_volume_enabled
    if cookies[:bgm_volume_value].blank?
      redirect_to verify_volume_path
    end
  end

  def write_volume_enabled_cookie(bgm_volume_value)
    cookies[:bgm_volume_value] = { value: bgm_volume_value }
  end
end
