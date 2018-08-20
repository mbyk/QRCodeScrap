class Api::V1::SessionController < ApplicationController
	
	def create
		render json: {
			status: 'OK',
			user: {
				user_id: 'example@example.com',
				user_name: 'example'
			}
		}
	end

end
