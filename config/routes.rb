Rails.application.routes.draw do
  root    'home#index'

  post    '/api/1/apps',      to: 'apps#create'
  put     '/api/1/apps/:id',  to: 'apps#update'
  delete  '/api/1/apps/:id',  to: 'apps#destroy'
end
