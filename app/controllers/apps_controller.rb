class AppsController < ApplicationController
  protect_from_forgery with: :null_session

  before_action :set_app, only: %i[update destroy]

  def create
    app = App.new(app_params)

    genre_params.each do |genre|
      genre = Genre.exists?(title: genre) ? Genre.find_by(title: genre) : Genre.create!(title: genre)
      app.genres << genre
    end

    respond_to do |format|
      msg = if app.save
              { status: 200, message: app.id.to_s }
            else
              { status: 400, message: 'Error while creating the App' }
            end
      p msg
      format.json { render json: msg }
    end
  end

  def update
    @app.udpate(app_params)

    genre_params.each do |genre|
      genre = Genre.exists?(title: genre) ? Genre.find_by(title: genre) : Genre.create!(title: genre)
      @app.genres << genre unless @app.genres.pluck(:title).include? genre
    end
  end

  def destroy
    @app.destroy
  end

  private

  def set_app
    @app = App.find_by(params[:id])
  end

  def app_params
    params.require(:app).permit(:name, :price, :rating, :link, :image)
  end

  def genre_params
    params.require(:app).permit(:genres)
  end
end
