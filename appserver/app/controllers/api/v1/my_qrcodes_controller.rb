class Api::V1::MyQrcodesController < ApplicationController

  before_action :authenticate_request!

  def list
    email = @decoded_api_token[:email]
    user = User.find_by(email: email)
    myQrcodes = Qrcode.where(user_id: user.id)
    # _myQrcodes = myQrcodes.map do |q|
    #   qrcodeUuid = q.qrcode_uuid
    #   encodeData = "http://localhost:3000/qrcode/#{qrcodeUuid}"
    #   qr = RQRCode::QRCode.new( encodeData, :size => 10, :level => :h )
    #   base64_image = qr.to_img.resize(200,200).to_data_url
    #   content = base64_image.split(',', 2).last
    #   q.attributes.merge(base64img: content)
    # end
    render json: {
      status: 'OK',
      results: myQrcodes
    }

  end

end
