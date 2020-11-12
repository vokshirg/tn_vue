Rails.application.routes.draw do
  root "home#index"
  devise_for :clients, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout'}

  get :current_admin, to: 'application#current_admin'
  get :current_user, to: 'application#current_user'

  constraints -> (req) { req.format == :json } do
    resources :organizations, only: [:index, :create, :update, :destroy]

    namespace :admin do
      resources :clients
      resources :organizations
      resources :equipments
    end
  end

  namespace :admin do
    root "dashboard#index"
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
  end

  get 'admin/*slug', to: 'admin/dashboard#index'
  get '*slug', to: 'home#index'
end
