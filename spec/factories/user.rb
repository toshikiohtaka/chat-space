FactoryGirl.define do
  
  factory :user do
    email                  {Faker::Internet.email}
    name                   {Faker::HarryPotter.name}
    password               '00000000'
    password_confirmation  '00000000'
  end
end
