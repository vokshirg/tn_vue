json.array! @equipments do |eq|
  json.id eq[:id]
  json.name eq[:name]
  json.sn eq[:sn]
  json.eq_type eq[:eq_type]
  json.org eq.organization, :id, :name, :inn if eq.organization
end