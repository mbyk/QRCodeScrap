require 'securerandom'

class Api::V1::QrcodesController < ApplicationController

  before_action :authenticate_request!

  def create

    @gen_type_url = GenTypeUrl.new(gen_type_url_params)
    @qrcode = Qrcode.new(qrcode_params)
    
    qrcode_uuid = SecureRandom.hex(30) 
    @qrcode.qrcode_uuid = qrcode_uuid
    @qrcode.user = @current_user

    @gen_type_url = GenTypeUrl.new(gen_type_url_params)
    @qrcode.gen_type_url = @gen_type_url
    if @qrcode.save
      render json: {
        status: 'OK',
        qrcode_uuid: "#{qrcode_uuid}"
      }
    else
      render json: {
        status: 'NG',
        erorr: {
          message: "#{@qrcode.errors.to_s}"
        }
      }
    end

  end

  private 
    # url type param
    def gen_type_url_params
      params.require(:gen_type_url).permit(:url)
    end

    # common param
    def qrcode_params
      params.require(:qrcode).permit(:title, :gen_type)
    end

end
