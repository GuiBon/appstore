class Genre < ActiveRecord::Base
  include AlgoliaSearch

  belongs_to :app

  validates :title, presence: true, uniqueness: true

  algoliasearch do
    attribute :title

    customRanking ['desc(title)']
    hitsPerPage 50
  end
end
