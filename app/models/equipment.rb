class Equipment < ApplicationRecord
  enum eq_type: [:aggregates, :removable, :small_parts, :other]
  belongs_to :organization, optional: true
end
