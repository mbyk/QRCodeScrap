require 'securerandom'

class Api::V1::QrcodesController < ApplicationController

  FILE_MODE = 'file'
  BASE64_MODE = 'base64'

  before_action :authenticate_request!, only: [:create]

  def create

    @gen_type_url = GenTypeUrl.new(gen_type_url_params)
    @qrcode = Qrcode.new(qrcode_params)
    
    qrcode_uuid = SecureRandom.hex(30) 
    @qrcode.qrcode_uuid = qrcode_uuid
    @qrcode.user = @current_user

    qr = RQRCode::QRCode.new( "http://localhost:3000/qrcode/#{qrcode_uuid}", :size => 10, :level => :h )
    base64_image = qr.to_img.resize(200,200).to_data_url
    content = base64_image.split(',', 2).last
    @qrcode.base64img = content

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

  def list

    qrcodes  = Qrcode.all
    render json: {
      status: 'OK',
      results: qrcodes
    }
 
   end

   def get
      qrcodeUuid = params[:id]
      qrcode = Qrcode.find_by(qrcode_uuid: qrcodeUuid)
      if qrcode
        render json: {
          status: 'OK',
          result: qrcode
        }
      else
        render json: {
          status: 'NG',
          error: {
            message: 'data not found.'
          }
        }
      end
   end

   def generate

    gen_mode = FILE_MODE
    gen_mode = BASE64_MODE if params['mode'] == BASE64_MODE

    qrcode_data = params[:qrcode_data]
    if qrcode_data == nil
      render json: {
        status: 'NG',
        error: {
          message: 'qrcode data not found.'
        }
      }
      return
    end

    qr = RQRCode::QRCode.new( qrcode_data, :size => 10, :level => :h )
    base64_image = qr.to_img.resize(200,200).to_data_url

    content = base64_image.split(',', 2).last

    if gen_mode == BASE64_MODE
      render json: {
        status: 'OK',
        content: content
      }
    else
      send_data ::Base64.decode64(content),
        filename: "file.png",
        type: 'image/png',
        disposition: 'inline'
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
