class AddColumnToQrcodeidToGenTypeMaps < ActiveRecord::Migration[5.1]
  def change
    add_reference :gen_type_maps, :qrcode, foreign_key: true
  end
end
