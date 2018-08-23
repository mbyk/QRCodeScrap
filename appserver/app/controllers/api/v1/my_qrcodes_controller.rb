class Api::V1::MyQrcodesController < ApplicationController

  before_action :authenticate_request!

  def list

    myQrcodes = Qrcode.all
    render json: {
      status: 'OK',
      results: myQrcodes
    }

  end

end
