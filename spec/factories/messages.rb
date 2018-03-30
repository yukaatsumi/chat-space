FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/spec/fixtures/files/sample_photo.jpg")
    user
    group
  end
end
