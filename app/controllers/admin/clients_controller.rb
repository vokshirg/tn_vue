class Admin::ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]

  def index
    @clients = Client.all
  end

  def create
    random_pass = Random.hex(10)
    @client = Client.new(permitted_params)
    @client.password = random_pass

    if @client.save
      render json: @client, status: :created
    else
      render json: @client.errors, status: :expectation_failed
    end
  end

  def update
    if @client.update(permitted_params)
      render json: @client, status: :ok
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @client.destroy
      head :no_content
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  private
  def set_client
    @client = Client.find(params[:id])
    # authorize @client
  end

  def permitted_params
    params.require(:client).permit(:email, :fullname, :phone, organization_ids:[])
  end
end