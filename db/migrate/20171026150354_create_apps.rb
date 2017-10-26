class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|
      t.string  :name, unique: true
      t.float   :price, default: 0
      t.float   :rating, default: 0
      t.text    :link, default: nil
      t.text    :image, default: nil

      t.timestamps null: false
    end
  end
end
