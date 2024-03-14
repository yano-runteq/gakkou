Rails.application.routes.draw do
  root "tops#top"

  resources :contacts, only: %i[new create] do
    collection do
      post "check", to: "contacts#check"
      get "completed", to: "contacts#completed"
    end
  end
end
