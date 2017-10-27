class AppsController < ApplicationController
  protect_from_forgery with: :null_session

  before_action :set_app, only: %i[update destroy]

  def create
    app = App.new(app_params)

    genre_params[:genres].each do |genre|
      genre = Genre.exists?(title: genre) ? Genre.find_by(title: genre) : Genre.create!(title: genre)
      app.genres << genre
    end

    respond_to do |format|
      msg = if app.save
              { status: 200, message: app.id.to_s }
            else
              { status: 400, message: 'Error while creating the App' }
            end
      format.json { render json: msg }
    end
  end

  def update
    genre_params.each do |genre|
      genre = Genre.exists?(title: genre) ? Genre.find_by(title: genre) : Genre.create!(title: genre)
      @app.genres << genre unless @app.genres.pluck(:title).include? genre
    end

    respond_to do |format|
      msg = if @app.update(app_params)
              { status: 200, message: @app.id.to_s }
            else
              { status: 400, message: 'Error while updating the App' }
            end
      format.json { render json: msg }
    end
  end

  def destroy
    respond_to do |format|
      msg = if @app.destroy
              { status: 200, message: 'App destroyed' }
            else
              { status: 400, message: 'Error while destroying the App' }
            end
      format.json { render json: msg }
    end
  end

  private

  def set_app
    @app = App.find(params[:id])
  end

  def app_params
    params.require(:app).permit(:name, :price, :rating, :link, :image)
  end

  def genre_params
    params.require(:app).permit(genres: [])
  end
end
