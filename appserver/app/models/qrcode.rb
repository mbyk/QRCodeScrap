class Qrcode < ApplicationRecord
	belongs_to :user
	
	has_one :gen_type_url

	validates :title, presence: true
	validates :gen_type, presence: true
	validates :qrcode_uuid, presence: true

end
