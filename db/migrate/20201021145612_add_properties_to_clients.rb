class AddPropertiesToClients < ActiveRecord::Migration[6.0]
  def change
    change_table :clients do |c|
      c.column :phone, :string
      c.column :fullname, :string
    end
  end
end
