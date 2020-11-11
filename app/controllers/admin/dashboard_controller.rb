class Admin::DashboardController < ApplicationController
  before_action :authenticate_admin_staff!

  layout 'admin'
  def index
  end


end
