@organizations.each do |org|
  json.set! org[:id] do
    json.id org[:id]
    json.name org[:name]
    json.inn org[:inn]
    json.ogrn org[:ogrn]
    json.org_type org[:org_type]
    json.clients org.clients, :id, :email, :fullname
    json.equipments org.equipments, :id, :name, :eq_type
  end
end