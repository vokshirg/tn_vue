class CreateEquipment < ActiveRecord::Migration[6.0]
  def change
    create_table :equipment do |t|
      t.string :name
      t.integer :eq_type
      t.string :sn
      t.references :organization, null: true, foreign_key: true

      t.timestamps
    end
  end
end
