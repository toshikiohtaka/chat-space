class MessagesController < ApplicationController

  before_action :set_group, :set_message, only: [:index, :create]
  before_action :set_new_messages, only: [:index], if: :api_request?

  def index
    respond_to do |format|
      format.html
      format.json
    end
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
    params.require(:message).permit(:body, :image).merge(group_id: params[:group_id])
  end

  def api_request?
    request.format.json?
  end

  def set_group
    @group = Group.find(params[:group_id])
    @groups = current_user.groups.order(created_at: :DESC)
  end

  def set_message
    @message = current_user.messages.new
    @messages = @group.messages
  end

  def set_new_messages
    @new_messages = @messages.where('id > ?', params[:id])
  end
end
