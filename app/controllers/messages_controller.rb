class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups.order(created_at: :DESC)
    @members = @group.users
    @message = current_user.messages.new
    @messages = @group.messages
  end

  def create
    @message = current_user.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path}
        format.json
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:body).merge(group_id: params[:group_id])
  end
  
end
