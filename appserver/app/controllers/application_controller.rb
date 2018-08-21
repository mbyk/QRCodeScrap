class ApplicationController < ActionController::API

  protected

    def payload(user)
      return nil unless user && user.email

      {
        api_token: JsonWebToken.encode({ username: user.username, email: user.email, exp: (Time.now + 2.week).to_i }),
        user: {
          username: user.username,
          email: user.email
        }
      }
    end

    def authenticate_request!
      unless api_token_valid?
        render json: {
          status: 'NG',
          error: {
            message: 'user not authenticated'
          }
        }
        return
      end

      @current_user = User.find_by(email: decoded_api_token[:email])
    rescue JWT::VerificationError, JWT::DecodeError
      render json: {
        status: 'NG',
        error: {
          message: 'user not authenticated'
        }
      }
    end

  private

    def api_token
        @api_token ||= if request.headers['Authorization'].present? && 
                        authorizationHeader = request.headers['Authorization']
                        authorizationHeader&.split('Bearer ')&.last
                       end
    end

    def decoded_api_token
      @decoded_api_token = JsonWebToken.decode(api_token)
    end

    def api_token_valid?
      api_token && decoded_api_token && decoded_api_token[:email]
    end

end
