class OrganizationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'orgs'
  end
end