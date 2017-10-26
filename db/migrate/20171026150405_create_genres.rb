class CreateGenres < ActiveRecord::Migration
  def change
    create_table :genres do |t|
      t.string  :title, unique: true
      t.integer :app_id

      t.timestamps null: false
    end
  end
end
