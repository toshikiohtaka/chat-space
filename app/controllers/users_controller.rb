class UsersController < ApplicationController
  
  def edit
    @user = User.find(current_user.id)
    binding.pry
  end

  def update

  end

end
