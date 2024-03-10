Rails.application.routes.draw do
  root "tops#top"

  get "about" => "abouts#about"
end
