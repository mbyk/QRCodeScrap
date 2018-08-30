class Qrcode < ApplicationRecord
	belongs_to :user
	has_one :gen_type_url, dependent: :destroy
	has_one :gen_type_map, dependent: :destroy
	has_many :mylists, dependent: :destroy

	validates :title, presence: true
	validates :gen_type, presence: true
	validates :qrcode_uuid, presence: true

	# ex WHERE `qrcodes`.`id` IN (1, 2) ORDER BY `qrcodes`.`created_at` DESC
	scope :qrcodes_in, ->(qrcode_ids, order) { where(id: qrcode_ids).order(created_at: order) }

end
