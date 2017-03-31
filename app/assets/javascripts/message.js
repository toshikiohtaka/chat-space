$(document).on('turbolinks:load', function() {
  $('#chat-message-form__submit').on('click', function(e) {
    e.preventDefault();
    ajaxMessage();
  });
  $('#file-input').on('change', function() {
    ajaxMessage();
  });
  if(location.pathname.match("messages")) {
    setInterval(autoLoading, 1000);
  }
});

function buildHTML(message) {
  var image = message.image ? image = `<img src="${message.image}">` : image = '';
  var html  = `<li class="chat-message">
                 <div class="chat-message__header">
                   <p class="chat-message__user">
                     ${message.name}
                   </p>
                   <p class="chat-message__date">
                     ${message.created_at}
                   </p>
                 </div>
                 <p class="chat-message__text">
                   ${message.body}
                 </p>
                 ${image}
               </li>`
  $('.chat-messages').append(html);
}

function scroll() {
  $('.chat-body').animate({
      scrollTop:$('.chat-messages').height()
    });
}

function ajaxMessage() {
  var formData = new FormData($('#new_message').get(0));
  $.ajax({
    type: 'POST',
    url: './messages',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json'
  })
  .done(function(data) {
    buildHTML(data);
    $('.js-form__text-field').val('');
    $('#new_message').get(0).reset();
    scroll();
  })
  .fail(function() {
    alert('error');
  });
}

function autoLoading() {
  var id = location.href.split("/")[4];
  $.ajax({
    type: 'GET',
    url: './messages',
    data: {
      group_id: id
    },
    dataType: 'json'
  })
  .done(function(data) {
    var messageNum = $('.chat-message').length;
    var loadedMessageNum = data.length;
    if(messageNum != loadedMessageNum) {
      for(var i = messageNum; i < loadedMessageNum; i ++) {
        buildHTML(data[messageNum]);
        scroll();
      }
    }
  })
  .fail(function() {
    alert("ロードエラー");
  });
}
