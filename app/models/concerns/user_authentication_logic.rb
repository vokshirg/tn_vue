require 'active_support/concern'

module UserAuthenticationLogic
  extend ActiveSupport::Concern

  included do
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    # , :registerable
    devise :database_authenticatable,
           :recoverable, :rememberable, :validatable
  end
end