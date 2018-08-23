class User < ApplicationRecord
  has_many :mylists
  has_secure_password validations: false

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, confirmation: true
  validates :password_confirmation, presence: true
end
