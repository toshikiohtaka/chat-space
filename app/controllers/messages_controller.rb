class MessagesController < ApplicationController

  before_action :set_group, :set_message, only: [:index, :create]

  def index
    respond_to do |format|
      format.html
      format.json { @new_messages = @messages.where('id > ?', params[:id]) }
    end
  end

  def create
    @message = current_user.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path }
        format.json
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(group_id: params[:group_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
    @groups = current_user.groups.order(created_at: :DESC)
  end

  def set_message
    @message = current_user.messages.new
    @messages = @group.messages
  end

end
