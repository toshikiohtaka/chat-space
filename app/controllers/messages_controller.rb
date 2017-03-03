class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups.order("created_at DESC")
    @members = @group.users
  end
  
end
