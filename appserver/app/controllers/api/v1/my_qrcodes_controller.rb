class Api::V1::MyQrcodesController < ApplicationController

  before_action :authenticate_request!

  def list
    email = @decoded_api_token[:email]
    user = User.find_by(email: email)
    myQrcodes = Qrcode.where(user_id: user.id)
    render json: {
      status: 'OK',
      results: myQrcodes
    }

  end

end
