json.array!(@newMessages) do |message|
  json.id          message.id
  json.name        message.user.name
  json.body        message.body
  json.created_at  message.created_at.to_s
  json.image       message.image.url
end
