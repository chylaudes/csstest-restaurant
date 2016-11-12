require "algoliasearch"

Algolia.init :application_id => ENV["ALGOLIA_API_CLIENT_ID"], :api_key => ENV["ALGOLIA_A_KEY"]
def load_data_from_database
  records = test_data
  return records
end

def test_data
  [
    {
      "whatever" => "good"
    },
    {
      "verge" => "yummm"
    }
  ]
end

index = Algolia::Index.new("coffee_shops")
index.clear_index
# `load_data_from_database` must return an array of Hash representing your objects
load_data_from_database.each_slice(1000) do |batch|
  index.add_objects(batch)
end

# def serialize_algolia
#   #code
# end
