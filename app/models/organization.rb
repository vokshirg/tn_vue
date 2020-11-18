class Organization < ApplicationRecord
  enum org_type: [:ip, :ul]
  has_and_belongs_to_many :clients
  has_many :equipments, dependent: :nullify

  scope :search_filter, -> (q) {
    where("name ILIKE ?", "%#{q}%")
        .or(where("inn ILIKE ?", "%#{q}%"))
        .or(where("ogrn ILIKE ?", "%#{q}%"))
  }


  after_save :broadcast

  private

  def broadcast
    ActionCable.server.broadcast('orgs', render_message(self))
  end

  private

  def render_message(org)
    JSON.parse ApplicationController.renderer.render(template: 'admin/organizations/show', assigns: { organization: org} )
  end
end
