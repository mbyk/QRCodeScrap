class CreateGenTypeMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :gen_type_maps do |t|
      t.string :address, presence: true

      t.timestamps
    end
  end
end
