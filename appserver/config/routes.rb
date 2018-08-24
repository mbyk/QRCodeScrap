Rails.application.routes.draw do

  namespace :api, format: 'json' do
    namespace :v1 do
      post '/login', to: 'session#create'
      post '/signup', to: 'users#create'
      post '/api_token_validate', to: 'session#validate_api_token'
      post '/qrcode', to: 'qrcodes#create'
      get '/qrcode/generate', to: 'qrcodes#generate'
      get '/qrcodes', to: 'qrcodes#list'
      get '/qrcodes/:id', to: 'qrcodes#get'
      get '/my/qrcode', to: 'my_qrcodes#list'
      get '/mylist', to: 'mylist#list'
      get '/mylist_status/:id', to: 'mylist#status'
      post '/mylist/:id', to: 'mylist#add_or_remove'
    end
  end

end

