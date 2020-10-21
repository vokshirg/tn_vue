class Admin::ClientsController < ApplicationController
  def index
    @clients = Client.all
  end
end