$(function(){
  function buildHTML(message){
      if(message.image.url == null){
        var image = "";
      }
      else {
        var image = `<img src=${message.image.url}>`;
      }
    var html = `<div class="messages__message">
                  <div class="messages__message__upper">
                    <div class="messages__message__upper__user-name">
                      <p=${message.id}>${message.name}</p>
                    </div>
                    <div class="messages__message__upper__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="messages__message__bottom">
                    <p class="messages__message__bottom__content">
                      ${message.text}
                      <br>
                      ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html)
      $('#message_content').val('')
      $('#message_image').val('')
      $('.main__footer__form__button').prop("disabled", false)
      $(".main__messages").animate({scrollTop:$(".main__messages")[0].scrollHeight},"swing");
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
});
