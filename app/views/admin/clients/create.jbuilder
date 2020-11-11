json.id @client[:id]
json.email @client[:email]
json.fullname @client[:fullname]
json.phone @client[:phone]
json.orgs @client.organizations, :id, :name, :inn
