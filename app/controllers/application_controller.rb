class ApplicationController < ActionController::Base
  layout :layout_by_resource

  def current_admin
    render json: current_admin_staff
  end


  def current_user
    render json: current_client
  end


  private

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end
end
