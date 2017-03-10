FactoryGirl.define do
  pass = Faker::Internet.password
  
  factory :user do
    email                  {Faker::Internet.email}
    name                   {Faker::HarryPotter.name}
    password               pass
    password_confirmation  pass
  end
end
