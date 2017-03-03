class ChangeColumnToUser < ActiveRecord::Migration[5.0]

  def up
    change_column :users, :name, :string, null: false
  end

  def down
    change_column :users, :name, :string
  end
end
