Rails.application.routes.draw do
  root "tops#top"

  resources :contacts, only: %i[new create] do
    collection do
      get "contacts/check", to: "contacts#check"
      get "contacts/completed", to: "contacts#completed"
    end
  end
end
