class Organization < ApplicationRecord
  enum org_type: [:ip, :ul]
  has_and_belongs_to_many :clients
  has_many :equipments, dependent: :nullify
end
