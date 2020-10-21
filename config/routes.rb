Rails.application.routes.draw do
  root "home#index"
  devise_for :clients, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout'}

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

    get :clients, to: 'clients#index', format: :as_json
  end
end
