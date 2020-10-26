class Organization < ApplicationRecord
  enum type: [:ip, :ul]
  has_and_belongs_to_many :clients
end
