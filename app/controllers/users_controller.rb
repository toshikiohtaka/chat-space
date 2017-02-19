class UsersController < ApplicationController
  
  def edit
    @user = User.find(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
    binding.pry
    @user.update(update_params)
    redirect_to controller: "messages", action: "index"
  end

  private
  def update_params
    params.require(:user).permit(:name)
  end

end
