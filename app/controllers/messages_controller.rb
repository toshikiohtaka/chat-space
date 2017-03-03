class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups.order("created_at DESC")
    @members = @group.users
    @messages = Message.where(group_id: @group.id)
    @message = Message.new
  end

  def create
    @msg = Message.new(message_params)
    if @msg.save
      redirect_to group_messages_path
    else
      flash[:alert] = "メッセージを入力してください。"
      redirect_to group_messages_path
    end
  end

  private
  def message_params
    params.require(:message).permit(:message, :user_id).merge(group_id: params[:group_id])
  end
  
end
