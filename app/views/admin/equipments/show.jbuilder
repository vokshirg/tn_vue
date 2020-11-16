json.id @equipment[:id]
json.name @equipment[:name]
json.sn @equipment[:sn]
json.eq_type @equipment[:eq_type]
json.org @equipment.organization, :id, :name, :inn if @equipment.organization
