class HomeController < ApplicationController
  include AlgoliaSearch

  def index
    hits = Genre.search('')
    genres = []

    hits.each do |hit|
      genres << hit.title
    end

    # Reused in app/views/home/index.html.erb,
    @props = { title: "Add, edit, delete Apps; easier than ever !", genres: genres }
  end
end
