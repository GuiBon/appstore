require 'json'

namespace :apps do
  desc 'Import the App data in the Database'
  task import: :environment do
    # Get the data from the Json file
    apps_data = JSON.parse(File.read("#{Dir.pwd}/lib/tasks/apps.json"))

    apps_data.each do |app_data|
      # Create the app
      app = App.new(name: app_data['name'], price: app_data['price'], rating: app_data['rating'],
                    link: app_data['link'], image: app_data['image'])

      # Get or create the genre
      app_data['genres'].each do |genre|
        genre = Genre.exists?(title: genre) ? Genre.find_by(title: genre) : Genre.create!(title: genre)
        app.genres << genre
      end

      app.save
      print '.'
    end
  end
end
