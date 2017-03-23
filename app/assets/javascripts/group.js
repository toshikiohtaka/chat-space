$(document).on('turbolinks:load', function () {
  
  var user_ids = [];

  function addUser(user) {
    var html = `<li class="chat-group-user"> ${user.name}
                  <a class="add-user--btn" data-user-name="${user.name}" data-user-id="${user.id}"> 追加 </a>
                </li>`;
    $('#chat-group-members').append(html);
  }

  function addUserToGroup(user) {
    var name = user.find('a').data('user-name');
    var id   = user.find('a').data('user-id');
    var html = `<li class="chat-group-added-user"> ${name}
                  <input name="group[user_ids][]" value="${id}" type="hidden">
                  <a class="delete-user--btn" data-user-id="${id}"> 削除 </a>
                </li>`;
    $('#chat-group-users').append(html);
    user_ids.push(id);
  }

  function deleteUserId(user) {
    var user_id = user.find('a').data('user-id');
    var num     = user_ids.indexOf(user_id);
    user_ids.splice(num,1);
    user.remove();
  }

  $('#chat_group_names').on('keyup', function() {
    var preWord = '';
    var input   = $('#chat_group_names').val();
    if(input == preWord) {
      $('.chat-group-user').remove();
    } else {
      $('.chat-group-user').remove();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {
          user: input
        },
        dataType: 'json'
      })
      .done(function(data) {
        $.each(data, function(i,user) {
          if(user_ids.indexOf(user.id) == -1) {
            addUser(user);
          }
        });
      })
      .fail(function() {
        alert('error');
      });
    }
  });
  $('#chat-group-members').on('click','.add-user--btn',function(e) {
    e.preventDefault
    var user = $(this).parent();
    var id   = user.find('a').data('user-id');
    if(user_ids.indexOf(id) == -1) {
      user.remove();
      addUserToGroup(user);
    }
  });
  $('#chat-group-users').on('click','.delete-user--btn', function(e) {
    e.preventDefault
    var user = $(this).parent();
    deleteUserId(user);
  })
});
