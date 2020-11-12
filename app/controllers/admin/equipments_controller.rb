class Admin::EquipmentsController < ApplicationController
  before_action :set_equipment, only: [:show, :edit, :update, :destroy]

  def index
    @equipments = Equipment.all
  end

  def show; end

  def create
    @equipment = Equipment.new(permitted_params)
    if @equipment.save
      render json: @equipment, status: :created
    else
      render json: @equipment.errors, status: :expectation_failed
    end
  end

  def update
    if @equipment.update(permitted_params)
      render json: @equipment, status: :ok
    else
      render json: @equipment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @equipment.destroy
      head :no_content
    else
      render json: @equipment.errors, status: :unprocessable_entity
    end
  end

  private
  def set_equipment
    @equipment = Equipment.find(params[:id])
    # authorize @equipment
  end

  def permitted_params
    params.require(:equipment).permit(:name, :sn, :eq_type, :organization_id)
  end
end