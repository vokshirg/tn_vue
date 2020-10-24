class Admin::DashboardController < ApplicationController
  layout 'admin'
  def index
  end

  def current_admin
    render json: current_admin_staff
  end
end
