class Qrcode < ApplicationRecord
	belongs_to :user
	has_one :gen_type_url

	validates :title, presence: true
	validates :gen_type, presence: true
	validates :qrcode_uuid, presence: true

	# ex WHERE `qrcodes`.`id` IN (1, 2) ORDER BY `qrcodes`.`created_at` DESC
	scope :qrcodes_in, ->(qrcode_ids, order) { where(id: qrcode_ids).order(created_at: order) }

end
