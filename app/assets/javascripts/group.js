$(document).on('turbolinks:load', function () {
  
  var user_ids = [];

  function addUser(user) {
    var html = `<li class="chat-group-user"> ${user.name}
                  <a class="add-user-btn" data-user-name="${user.name}" data-user-id="${user.id}"> 追加 </a>
                </li>`;
    $('#chat-group-members').append(html);
  }

  function addUserToGroup(name,id) {
    var html = `<li class="chat-group-added-user"> ${name}
                  <input name="group[user_ids][]" value="${id}" type="hidden">
                  <a class="delete-user-btn" data-user-name="${name}" data-user-id="${id}"> 削除 </a>
                </li>`;
    $('#chat-group-users').append(html);
    user_ids.push(id);
  }

  function deleteUserId(id, user) {
    var num = user_ids.indexOf(id);
    user_ids.splice(num,1);
    console.log(user_ids);
    user.remove();
  }

  $('#chat_group_names').on('keyup', function() {
    var preWord = '';
    var input = $('#chat_group_names').val();
    if(input == preWord) {
      console.log('ajax実行しない');
      $('.chat-group-user').remove();
    } else {
      console.log('ajax実行する');
      $('.chat-group-user').remove();
      $.ajax({
        type: 'GET',
        url: '/users.json',
        data: {
          user: input
        },
        dataType: 'json'
      })
      .done(function(data) {
        console.log(data);
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
  $('#chat-group-members').on('click','.add-user-btn',function(e) {
    console.log('追加');
    e.preventDefault
    var user_parent = $(this).parent();
    var user = user_parent.find('a');
    var user_name = user.data('user-name');
    var user_id = user.data('user-id');
    if(user_ids.indexOf(user_id) == -1) {
      user_parent.remove();
      addUserToGroup(user_name,user_id);
    }
  });
  $('#chat-group-users').on('click','.delete-user-btn', function(e) {
    console.log('削除');
    e.preventDefault
    var user_parent = $(this).parent();
    var user = user_parent.find('a');
    var user_id = user.data('user-id');
    deleteUserId(user_id,user_parent);
  })
});
