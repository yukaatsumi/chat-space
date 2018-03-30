# json.(@message, :id, :text, :image, :created_at)
json.id  @message.id
json.text  @message.content
json.image  @message.image
json.date  @message.created_at
json.name  @message.user.name
