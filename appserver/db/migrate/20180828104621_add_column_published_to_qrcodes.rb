class AddColumnPublishedToQrcodes < ActiveRecord::Migration[5.1]
  def change
    add_column :qrcodes, :published, :boolean, default: false
  end
end
