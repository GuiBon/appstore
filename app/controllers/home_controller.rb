class HomeController < ApplicationController
  def index
    # Reused in app/views/home/index.html.erb
    @props = { title: "Add, edit, delete Apps; easier than ever !" }
  end
end
