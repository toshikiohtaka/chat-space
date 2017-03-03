class Group < ApplicationRecord
  validate :add_error_message

  has_many :group_users
  has_many :users, through: :group_users

  def add_error_message
    if name.empty?
      errors[:base] << "グループ名を入力してください"
    end
  end
end
