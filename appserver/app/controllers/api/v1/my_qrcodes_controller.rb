class Api::V1::MyQrcodesController < ApplicationController

  before_action :authenticate_request!

  def list
    email = @decoded_api_token[:email]
    user = User.find_by(email: email)
    #myQrcodes = Qrcode.where(user_id: user.id).order(created_at: :desc)
    myQrcodes = Qrcode.page(params[:page] ||= 1).includes([:user]).where(user_id: user.id).order(created_at: :desc).per(6)
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
