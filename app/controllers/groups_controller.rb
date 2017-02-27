class GroupsController < ApplicationController
  
  def index
    @groups = Group.all.order("created_at DESC")
  end

  def new
    @group = Group.new
  end

  def create
    Group.create(group_params)
    redirect_to groups_path
  end

  def edit

  end

  def update
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
end
