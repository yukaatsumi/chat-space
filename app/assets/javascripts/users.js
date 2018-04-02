$(function() {

var search_list = $("#user-search-result");

// ユーザー検索時に表示されるHTMLを生成
  function appendUser(user){
    var html =
              `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${user.name}
                </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name="${user.name}">
                  追加
                </a>
              </div>`
      search_list.append(html);
  }
  function appendNoUser(user){
    var html =
              `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${name}</p>
              </div>`
      search_list.append(html);
  }

// ユーザー追加ボタンのクリックで追加されるHTMLの生成
function buildMenberHTML(id, name){
  var html =
            `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>
              <p class='chat-group-user__name'>${name}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
            </div>`
    $("#chat-group-users").append(html);
}

// インクリメンタルサーチ
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url:'/users',
      data: { keyword: input },
      dataType: 'json'
    })
// ユーザーの検索が成功した場合
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser("一致するユーザーはいません");
      }
    })
// ユーザーの検索に失敗した場合
    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    });
  });

// メンバーの追加
  $('#user-search-result').on('click', '.user-search-add', function(e) {
    e.preventDefault();
    var user_id = $(this).attr('data-user-id');
    console.log(user_id);
    var user_name = $(this).attr('data-user-name');
    buildMenberHTML(user_id, user_name);
  });
// メンバーの削除
  $('#user-search-result').on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});
