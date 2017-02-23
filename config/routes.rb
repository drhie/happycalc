Rails.application.routes.draw do
  root 'areas#index'
  resources :areas

  delete '/delete_all' => 'areas#destroy_all'
  delete '/delete' => 'areas#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
