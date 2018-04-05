json.array! @new_messages do |message|
  json.id  message.id
  json.text  message.content
  json.image  message.image
  json.date  message.created_at.strftime('%Y/%m/%d %H:%M:%S')
  json.name  message.user.name
end
