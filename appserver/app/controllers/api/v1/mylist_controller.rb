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

  def status
    qrcodeUuid = params[:id]
    email = @decoded_api_token[:email]
    user = User.find_by(email: email)

    qrcode = Qrcode.find_by(qrcode_uuid: qrcodeUuid)
    if qrcode == nil
      render json: {
        status: 'NG',
        error: {
          message: 'qrcode not found.'
        }
      }
      return
    end

    mylist = Mylist.where(user_id: user.id, qrcode_id: qrcode.id);
    render json: {
      status: 'OK',
      is_registered: mylist.count > 0
    }
  end

end
