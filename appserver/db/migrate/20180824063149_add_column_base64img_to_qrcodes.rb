class AddColumnBase64imgToQrcodes < ActiveRecord::Migration[5.1]
  def change
    add_column :qrcodes, :base64img, :text, null: false
  end
end
