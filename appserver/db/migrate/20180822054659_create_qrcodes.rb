class CreateQrcodes < ActiveRecord::Migration[5.1]
  def change
    create_table :qrcodes do |t|
      t.string :title
      t.integer :gen_type
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
