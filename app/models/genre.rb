class Genre < ActiveRecord::Base
  belongs_to :app

  validates :title, presence: true, uniqueness: true
end
