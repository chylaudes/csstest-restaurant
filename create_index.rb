require "algoliasearch"
require "csv"
require "json"


# #=========SCRIPT to combine  both CSV and JSON ========
def csv_to_hash
  p "Converting CSV into a Hash..."
  file_path = "resources/dataset/restaurants_info.csv"
  array = []
  csv_hash = {}
  hello = CSV.read(file_path, {:col_sep => ';'})
  hello.each_with_index do |line, index|
     if index === 0
       array = line
     else
       details_obj = { array[1] => line[1], array[2] => line[2], array[3] => line[3], array[4] => line[4], array[6] => line[6], array[7] => line[7]}
       csv_hash[line[0].to_i] = details_obj
     end
  end
  csv_hash
end

def json_to_hash
  p "Converting JSON into a ruby Array..."
   file = File.read("resources/dataset/restaurants_list.json")
   data_hash = JSON.parse(file)
end

def combine_both(csv_hash, json_array)
  p "Combining CSV hash and JSON Array..."
  return json_array.map do |hash|
    id_to_be_found = hash["objectID"]
    new_hash = hash.merge(csv_hash[id_to_be_found])
  end
end


#=========ALGOLIA SCRIPT========

Algolia.init :application_id => ENV["ALGOLIA_API_CLIENT_ID"], :api_key => ENV["ALGOLIA_A_KEY"]
def load_data_from_database
  combined_data = combine_both(csv_to_hash, json_to_hash)
end

index = Algolia::Index.new("restaurants")
p "Clearing Index....."
index.clear_index
p "Finished Clearing Index....."
# `load_data_from_database` must return an array of Hash representing your objects
p "Loading data to Algolia's API"
load_data_from_database.each_slice(1000) do |batch|
  index.add_objects(batch)
end

p "Process Completed!"
