json.array! @organizations do |org|
  json.id org[:id]
  json.name org[:name]
  json.inn org[:inn]
  json.ogrn org[:ogrn]
  json.org_type org[:org_type]
  json.clients org.clients, :id, :email, :fullname
end