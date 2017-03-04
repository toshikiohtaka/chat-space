class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups.order(created_at: :DESC)
    @members = @group.users
    @messages = @group.messages
    @message = current_user.messages.new
  end

  def create
    @message = current_user.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path
    else
      @group = Group.find(params[:group_id])
      @groups = current_user.groups.order(created_at: :DESC)
      @members = @group.users
      @messages = @group.messages
      flash[:alert] = "メッセージを入力してください。"
      render 'index'
    end
  end

  private
  def message_params
    params.require(:message).permit(:body).merge(group_id: params[:group_id])
  end
  
end
