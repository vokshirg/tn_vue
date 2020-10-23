json.array! @clients do |user|
  json.id user[:id]
  json.email user[:email]
  json.fullname user[:fullname]
  json.phone user[:phone]
end