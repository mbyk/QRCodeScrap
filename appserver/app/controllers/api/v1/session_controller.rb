class Api::V1::SessionController < ApplicationController

  before_action :authenticate_request!, only: [:validate_api_token]
  before_action :set_user, only: [:create]
  
  def create

    if @user.authenticate(session_params[:password])
      render json: {
        status: 'OK',
      }.merge(payload(@user))
    else
      render json: {
        status: 'NG',
        error: {
          message: 'invalid username/password'
        }
      }
    end

  end

  def validate_api_token
    render json: {
      logged_in: true
    }
  end

  private 

    def set_user
      @user = User.find_by!(email: session_params[:email])
    rescue
      render json: {
        status: 'NG',
        error: {
          message: 'user not found'
        }
      }
    end

    def session_params
      params.require(:session).permit(:email, :password)
    end

end
