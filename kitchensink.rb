require 'sinatra'
require 'json'
require 'redis'

redis = Redis.new(host: 'localhost', port: 6379)

get '/triangles' do
  res = redis.get("triangles")
  return res == "null" ? "No triangles" : res
end
