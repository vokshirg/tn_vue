class OrganizationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'orgs', coder: ActiveSupport::JSON
  end
end