class App < ActiveRecord::Base
  include AlgoliaSearch

  has_many :genres

  validates :name, presence: true, uniqueness: true
  validates :price, numericality: { greater_than_or_equal_to: 0, message: 'Price of the App must be greater or equal to 0' }
  validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5, message: 'Rating of the App must be between 0 and 5' }

  algoliasearch do
    attribute :name, :price, :rating, :link, :image
    attribute :genres do
      genres.pluck(:title)
    end

    searchableAttributes ['name']
    customRanking ['desc(rating)']
    attributesForFaceting ['genres']
    hitsPerPage 25
    maxValuesPerFacet 1000
  end
end
