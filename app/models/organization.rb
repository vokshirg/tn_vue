class Organization < ApplicationRecord
  enum org_type: [:ip, :ul]
  has_and_belongs_to_many :clients
  has_many :equipments, dependent: :nullify

  scope :search_filter, -> (q) {
    where("name ILIKE ?", "%#{q}%")
        .or(where("inn ILIKE ?", "%#{q}%"))
        .or(where("ogrn ILIKE ?", "%#{q}%"))
  }


  after_update { broadcast(:update) }
  after_create { broadcast(:create) }
  after_destroy { broadcast(:destroy) }


  private

  def broadcast(type)
    org = render_message(self)
    ActionCable.server.broadcast('orgs', {type: type, id: self.id, org: org })
  end

  def render_message(org)
    JSON.parse ApplicationController.renderer.render(template: 'admin/organizations/show', assigns: { organization: org} )
  end
end
