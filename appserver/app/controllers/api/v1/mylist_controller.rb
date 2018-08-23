class Api::V1::MylistController < ApplicationController

  before_action :authenticate_request!

  def list
    mylists = Mylist.all
    qrcodeIds = mylists.map(&:qrcode_id)
    qrcodes = Qrcode.qrcodes_in(qrcodeIds, :DESC)
    render json: {
      status: 'OK',
      results: qrcodes
    }
  end
end
