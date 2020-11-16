class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :name
      t.integer :org_type, default: 0
      t.string :inn
      t.string :ogrn

      t.timestamps
    end

    create_table :clients_organizations, id: false do |t|
      t.belongs_to :organization
      t.belongs_to :client
    end
  end
end
