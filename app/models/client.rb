class Client < ApplicationRecord
  include UserAuthenticationLogic
  has_and_belongs_to_many :organizations
  # fullname (не пустой, не менее 5 символов),
  # phone (не пустой, только цифры),
  # email (не пустой, валидный email)
end
