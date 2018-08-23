class Api::V1::MylistController < ApplicationController

  before_action :authenticate_request!

  def list
    email = @decoded_api_token[:email]
    user = User.find_by(email: email)
    mylists = Mylist.where(user_id: user.id)
    qrcodeIds = mylists.map(&:qrcode_id)
    qrcodes = Qrcode.qrcodes_in(qrcodeIds, :DESC)
    render json: {
      status: 'OK',
      results: qrcodes
    }
  end
end
