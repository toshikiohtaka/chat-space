class ChangeColumnToUser < ActiveRecord::Migration[5.0]
  def change
    def up
      change_column :users, :name, :string, null: false
    end
  end
end
