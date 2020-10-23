class Client < ApplicationRecord
  include UserAuthenticationLogic
  # fullname (не пустой, не менее 5 символов),
  # phone (не пустой, только цифры),
  # email (не пустой, валидный email)
end
