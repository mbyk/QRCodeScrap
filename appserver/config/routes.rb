Rails.application.routes.draw do

	namespace :api, format: 'json' do
		namespace :v1 do
			post '/login', to: 'session#create'
		end
	end

end
