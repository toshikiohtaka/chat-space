require 'rails_helper'

describe MessagesController, type: :controller do

  let(:user) {create(:user)}
  let(:group) {create(:group)}
  let(:groups) {create_list(:group, 3, users: [user])}
  let(:message) {create(:message)}
  let(:messages) {create_list(:message, 3, group: group)}

  before do
    login_user
  end

  describe 'GET #index' do

    before do
      get :index, params: {group_id: group.id}
    end

    it 'assigns the requested group to @group' do
      expect(assigns(:group)).to eq group
    end

    it 'populates an array of groups ordered by created_at DESC' do
      groups = user.groups
      expect(assigns(:groups)).to match(groups.sort{|a,b| a.created_at <=> b.created_at})
    end

    it 'populates an array of members' do
      members = group.users
      expect(assigns(:members)).to match(members)
    end

    it 'assigns the requested message to @message' do
      expect(assigns(:message)).to be_a_new(Message)
    end

    it 'populates an array of messages' do
      messages = group.messages
      expect(assigns(:messages)).to match(messages)
    end

    it 'renders the :index template' do
      expect(response).to render_template :index
    end
  end

  describe 'POST #create' do
    it 'save a new message' do
      expect(message.save).to be true
    end

    it 'dose not save a new message without body' do
      message = build(:message, body: '')
      message.valid?
      expect(message.errors[:body]).to include('を入力してください。')
    end

    it 'assigns the requested message to @message' do
      expect(assigns(:message)).to eq message
    end

    it 'redirects to the :index template when a new message is saved' do
      post :create, params: {message: {body: message.body}, group_id: group.id}
      expect(response).to redirect_to group_messages_path
    end

    it 'renders the :index template when a new message is not saved' do
      post :create, params: {message: {body: ''}, group_id: group.id}
      expect(response).to render_template :index
    end
  end

end
