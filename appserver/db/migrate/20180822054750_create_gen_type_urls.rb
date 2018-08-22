class CreateGenTypeUrls < ActiveRecord::Migration[5.1]
  def change
    create_table :gen_type_urls do |t|
      t.string :url
      t.references :qrcode, foreign_key: true

      t.timestamps
    end
  end
end
