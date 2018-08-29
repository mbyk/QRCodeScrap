class Api::V1::MyQrcodesController < ApplicationController

  before_action :authenticate_request!

  def list
    email = @decoded_api_token[:email]
    user = User.find_by(email: email)
    #myQrcodes = Qrcode.where(user_id: user.id).order(created_at: :desc)
    myQrcodes = Qrcode.page(params[:page] ||= 1).includes([:user]).where(user_id: user.id).order(created_at: :desc).per(6)
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
      results: myQrcodes.as_json(include: { user: { only: [:username] } }),
      meta: {
        current_page: myQrcodes.current_page,
        next_page: myQrcodes.next_page,
        prev_page: myQrcodes.prev_page,
        total_pages: myQrcodes.total_pages,
        total_count: myQrcodes.total_count
      }
    }

  end

end
