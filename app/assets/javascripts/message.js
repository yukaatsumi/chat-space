$(document).on('turbolinks:load', function() {
  // メッセージの自動更新
    function auto_update(){
      var message_id = $('.messages__message:last').attr('data-message-id')
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        $.ajax({
          url: location.href,
          type: 'GET',
          data: {id: message_id},
          dataType: 'json'
        })
        .done(function(data){
          var insertHTML = '';
          data.forEach(function(message) {
            insertHTML += buildHTML(message);
            $(".main__messages:last").append(insertHTML);
            $(".main__messages").animate({scrollTop:$(".main__messages")[0].scrollHeight},"swing");
          });
        })
        .fail(function(data){
          alert('更新できませんでした');
        });
      }
    }
  // メッセージ表示のHTMLを生成
  function buildHTML(message){
      if(message.image.url == null){
        message.image.url = ""
      }
    var html = `<div class="messages__message" data-message-id="${message.id}">
                  <div class="messages__message__upper">
                    <div class="messages__message__upper__user-name">
                      ${message.name}
                    </div>
                    <div class="messages__message__upper__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="messages__message__bottom">
                    <p class="messages__message__bottom__content">
                      ${message.text}
                      <br>
                      <img src="${message.image.url}">
                    </p>
                  </div>
                </div>`
    return html;
  }

  // メッセージ送信の非同期通信
  setInterval(auto_update, 5000);

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
