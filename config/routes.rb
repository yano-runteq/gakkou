Rails.application.routes.draw do
  root "tops#top"

  get "verify_volume", to: "tops#verify_volume", as: :verify_volume
  get "verify_yes", to: "tops#verify_yes", as: :verify_yes
  get "verify_no", to: "tops#verify_no", as: :verify_no

  resources :contacts, only: %i[new create] do
    collection do
      post "check", to: "contacts#check"
      post "back", to: "contacts#back"
      get "completed", to: "contacts#completed"
    end
  end
end
