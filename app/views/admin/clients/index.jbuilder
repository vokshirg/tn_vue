json.array! @clients do |user|
  json.id user[:id]
  json.email user[:email]
end