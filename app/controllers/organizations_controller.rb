class OrganizationsController < ApplicationController

  def index
    @organizations = current_client.organizations
  end
end