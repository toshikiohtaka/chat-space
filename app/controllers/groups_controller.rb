class GroupsController < ApplicationController

  def index
    @groups = current_user.groups.order(created_at: :DESC)
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_messages_path(@group)
      flash[:notice] = "グループが作成されました"
    else
      render 'new'
    end
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
