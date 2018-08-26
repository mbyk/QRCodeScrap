class GenTypeUrl < ApplicationRecord
  belongs_to :qrcode

  validates :url, presence: true
end
