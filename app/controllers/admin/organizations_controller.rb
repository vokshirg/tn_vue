class Admin::OrganizationsController < ApplicationController
  before_action :set_org, only: [:show, :edit, :update, :destroy]

  def index
    @organizations = Organization.page(params[:page]).per(params[:per])
    @organizations = @organizations.search_filter(params[:filter]) if params[:filter].present?
  end

  def show; end

  def create
    # random_pass = Random.hex(10)
    @organization = Organization.new(permitted_params)
    # @organization.password = random_pass

    if @organization.save
      render json: @organization, status: :created
    else
      render json: @organization.errors, status: :expectation_failed
    end
  end

  def update
    if @organization.update(permitted_params)
      render json: @organization, status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @organization.destroy
      head :no_content
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end



  private

  def set_org
    @organization = Organization.find(params[:id])
    # authorize @org
  end

  def permitted_params
    params.require(:organization).permit(:name, :inn, :ogrn, :org_type, client_ids:[], equipment_ids:[])
  end
end