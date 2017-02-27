class GroupsController < ApplicationController
  
  def index
    @groups = current_user.groups.order("created_at DESC")
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.create(group_params)
    redirect_to group_messages_path(@group)
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    @group.update(group_params)
    redirect_to group_messages_path(@group)
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
end
