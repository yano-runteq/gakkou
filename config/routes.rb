Rails.application.routes.draw do
  get "about" => "abouts#about"
  root "tops#top"
end
