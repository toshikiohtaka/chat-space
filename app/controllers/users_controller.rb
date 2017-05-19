class UsersController < ApplicationController

  def search
    name = params[:user]
    @results = User.where.not(id: current_user.id).where('name LIKE(?)', "%#{name}%")
    respond_to do |format|
      format.json
    end
  end

end
