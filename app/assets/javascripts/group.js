var user_ids = [];

function addUser(user) {
  var html = '<li class="chat-group-user" data-user-id="' + user.id + '" data-user-name="' + user.name + '">' + user.name +
                '<a class="user-btn--add"> 追加' + '</a>' +
              '</li>';
  $('#chat-group-members').append(html);
}

function addUserToGroup(user) {
  var name = user.data('user-name');
  var id   = user.data('user-id');
  var html =  '<li class="chat-group-added-user">' + name +
                '<input name="group[user_ids][]" value="' + id + '"type="hidden">' +
                '<a class="user-btn--delete"> 削除' + '</a>' +
              '</li>';
  $('#chat-group-users').append(html);
  user_ids.push(id);
}

function deleteUserId(user) {
  var id  = user.data('user-id');
  var num = user_ids.indexOf(id);
  user_ids.splice(num,1);
  user.remove();
}

function incrementalSearch() {
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
}

$(document).on('turbolinks:load', function () {
  $('#chat_group_names').on('keyup', function() {
    incrementalSearch();
  });
  $('#chat-group-members').on('click','.user-btn--add',function() {
    var user = $(this).parent();
    var id   = user.data('user_id');
    if(user_ids.indexOf(id) == -1) {
      user.remove();
      addUserToGroup(user);
    }
  });
  $('#chat-group-users').on('click','.user-btn--delete', function() {
    var user = $(this).parent();
    deleteUserId(user);
  })
});
