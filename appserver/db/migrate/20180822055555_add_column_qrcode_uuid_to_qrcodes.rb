class AddColumnQrcodeUuidToQrcodes < ActiveRecord::Migration[5.1]
  def change
    add_column :qrcodes, :qrcode_uuid, :string, unique: true, null: false
  end
end
