Rails.application.routes.draw do
  root "home#index"
  devise_for :clients, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout'}

  get :current_admin, to: 'application#current_admin'
  get :current_user, to: 'application#current_user'

  namespace :admin do
    root 'dashboard#index'
    devise_for :staffs,
               path: 'auth',
               root: 'dashboard#index',
               path_names: { sign_in: 'login', sign_out: 'logout'},
               controllers: {
                   sessions: 'admin/staffs/sessions',
                   registrations: 'admin/staffs/registrations',
                   passwords: 'admin/staffs/passwords',
                   confirmations: 'admin/staffs/confirmations'
               }

    resources :clients, only: [:index, :create, :update, :destroy]
    resources :organizations, only: [:index, :create, :update, :destroy]
    # get :clients, to: 'clients#index'
    # post :clients, to: 'clients#create'
  end
end
