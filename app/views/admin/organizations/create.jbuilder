json.id @organization[:id]
json.name @organization[:name]
json.inn @organization[:inn]
json.ogrn @organization[:ogrn]
json.org_type @organization[:org_type]
json.clients @organization.clients, :id, :email, :fullname
json.equipments @organization.equipments, :id, :name, :eq_type
