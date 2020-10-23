class Admin::ClientsController < ApplicationController

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

  private
  def permitted_params
    params.require(:client).permit(:email, :fullname, :phone)
  end
end