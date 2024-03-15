Rails.application.routes.draw do
  root "tops#top"

  resources :contacts, only: %i[new create] do
    collection do
      post "check", to: "contacts#check"
      post "back", to: "contacts#back"
      get "completed", to: "contacts#completed"
    end
  end
end
