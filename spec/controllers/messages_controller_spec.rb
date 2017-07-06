require 'rails_helper'

describe MessagesController, type: :controller do

  let(:user) {create(:user)}
  let(:group) {create(:group, users: [user])}
  let(:groups) {create_list(:group, 4, users: [user])}
  let(:message) {create(:message, user: user)}
  let(:messages) {create_list(:message, 3, group: group)}

  describe 'GET#index' do

    context 'case of user log in' do

      before do
        login_user
      end

      context 'case of current_user belongs to group' do

        before do
          get :index, params: { group_id: group }
        end

        it 'assigns the requested group to @group' do
          expect(assigns(:group)).to eq group
        end

        it 'populates an array of groups ordered by created_at DESC' do
          expect(assigns(:groups)).to match(user.groups.sort{ |a,b| b.created_at <=> a.created_at })
        end

        it 'assigns the requested message to @message' do
          expect(assigns(:message)).to be_a_new(Message)
        end

        it 'populates an array of messages' do
          messages = group.messages
          expect(assigns(:messages)).to match(messages)
        end

        it 'renders the index template' do
          expect(response).to render_template :index
        end
      end

      context 'case of current_user dose not belongs to group' do

        it 'redirects to root_path' do
          group = create(:group)
          get :index, params: { group_id: group }
          expect(response).to redirect_to root_path
        end
      end
    end

    context 'case of user dose not log in' do
      it 'redirects to new_user_session_path' do
        get :index, params: { group_id: group.id }
        expect(response).to redirect_to new_user_session_path
      end
    end
  end

  describe 'POST #create' do

    before do
      login_user
    end

    it 'assigns the requested message to @message' do
      post :create, params: {message: {body: message.body}, group_id: group.id}
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
