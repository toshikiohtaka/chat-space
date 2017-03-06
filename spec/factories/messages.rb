FactoryGirl.define do

  factory :message do
    body    "hello world"
    image   "hello world.png"
    created_at {Faker::Time.between(2.days.ago, Time.now, :all)}
  end

end
