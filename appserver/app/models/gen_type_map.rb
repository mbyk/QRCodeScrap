class GenTypeMap < ApplicationRecord
  belongs_to :qrcode

  validates :address, presence: true
end
