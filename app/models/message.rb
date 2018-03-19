class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  varidates :content, presence: true, unless: :image?
end
