FactoryGirl.define do

  factory :message do
    body       {Faker::HarryPotter.quote}
    image      {Faker::Avatar.image}
    created_at {Faker::Time.between(2.days.ago, Time.now, :all)}
  end
  
end
