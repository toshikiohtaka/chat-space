class GroupsController < ApplicationController
  
  def index
    @groups = Group.all.order("created_at DESC")
  end

  def new
    @group = Group.new
  end

  def create
    Group.create(name: group_params[:name])
    redirect_to action: 'index'
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end
end
