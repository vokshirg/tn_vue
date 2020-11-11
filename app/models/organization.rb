class Organization < ApplicationRecord
  enum org_type: [:ip, :ul]
  has_and_belongs_to_many :clients
end
