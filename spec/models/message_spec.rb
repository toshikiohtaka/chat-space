require 'rails_helper'

describe Message do
  describe '#create' do
    it 'is invalid without body' do
      message = build(:message, body: "")
      message.valid?
      expect(message.errors[:body]).to include("を入力してください。")
    end

    it 'is valid with body' do
      message = build(:message)
      message.valid?
      expect(message).to be_valid
    end
  end
end
