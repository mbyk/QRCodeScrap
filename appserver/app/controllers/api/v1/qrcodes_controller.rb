require 'securerandom'

class Api::V1::QrcodesController < ApplicationController

  FILE_MODE = 'file'
  BASE64_MODE = 'base64'

  before_action :authenticate_request!, only: [:create, :status, :published_or_unpublished]

  def create

    @qrcode = Qrcode.new(qrcode_params)
    
    qrcode_uuid = SecureRandom.hex(30) 
    @qrcode.qrcode_uuid = qrcode_uuid
    @qrcode.user = @current_user

    qr = RQRCode::QRCode.new( "http://localhost:3000/qrcode/#{qrcode_uuid}", :size => 10, :level => :h )
    base64_image = qr.to_img.resize(400,400).to_data_url
    content = base64_image.split(',', 2).last
    @qrcode.base64img = content

    if @qrcode.gen_type == 1 
      @gen_type_url = GenTypeUrl.new(gen_type_url_params)
      if gen_type_url_params[:url].blank?
        render json: {
          status: 'NG',
          erorr: {
            message: "url not found."
          }
        }
        return
      end
  
      @qrcode.gen_type_url = @gen_type_url
    elsif @qrcode.gen_type == 2
      @gen_type_map = GenTypeMap.new(gen_type_map_params)
      if gen_type_map_params[:address].blank?
        render json: {
          status: 'NG',
          erorr: {
            message: "address not found."
          }
        }
        return
      end
  
      @qrcode.gen_type_map = @gen_type_map
    end

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
    qrcodes = Qrcode.page(params[:page] ||= 1).includes([:user]).where(published: true).order(created_at: :desc).per(6)

    render json: {
      status: 'OK',
      results: qrcodes.as_json(include: { user: { only: [:username]  } }),
      meta: {
        current_page: qrcodes.current_page,
        next_page: qrcodes.next_page,
        prev_page: qrcodes.prev_page,
        total_pages: qrcodes.total_pages,
        total_count: qrcodes.total_count
      }
    }
 
   end

   def get
      qrcodeUuid = params[:id]
      qrcode = Qrcode.includes([:user, :gen_type_url, :gen_type_map]).find_by(qrcode_uuid: qrcodeUuid)
      # genTypeUrl = qrcode.gen_type_url
      # _qrcode = qrcode.attributes.merge(gen_type_url:  { url: genTypeUrl.url })

      if qrcode
        render json: {
          status: 'OK',
          result: qrcode.as_json(include: { user: { only: [:username] }, gen_type_url: { only: [:url] }, gen_type_map: { only: [:address] } })
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

  def destroy
    qrcodeUuid = params[:id]  
    qrcode = Qrcode.find_by(qrcode_uuid: qrcodeUuid)
    if qrcode && qrcode.destroy
      render json: {
        status: 'OK'
      }
    else
      render json: {
        status: 'NG',
        error: {
          message: 'destroy failed'
        }
      }
    end
  end

    # mode: 0
  # - published
  # mode: 1
  # - unpublished
  def published_or_unpublished

    mode = params[:mode] 
    qrcodeUuid = params[:id]

    if mode == nil || qrcodeUuid == nil
      render json: {
        status: 'NG',
        error: {
          message: 'request param invalid.'
        }
      }
      return
    end

    if mode == "0" || mode == "1"
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

      if mode == "1"
        qrcode.published = true
        if qrcode.save
          render json: {
            status: 'OK',
            is_published: true 
          }
        else
          render json: {
            status: 'OK',
            is_published: false 
          }
        end

      else
        qrcode.published = false
        if qrcode.save
          render json: {
            status: 'OK',
            is_published: false 
          }
        else
          render json: {
            status: 'OK',
            is_published: true 
          }
        end
      end
   else
      render json: {
        status: 'NG',
        error: {
          message: 'request param invalid.'
        }
      }
    end

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

    render json: {
      status: 'OK',
      is_published: qrcode.published 
    }
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

    # url type param
    def gen_type_map_params
      params.require(:gen_type_map).permit(:address)
    end

    # common param
    def qrcode_params
      params.require(:qrcode).permit(:title, :gen_type)
    end

end
