$(document).on('turbolinks:load', function() {
  $('#chat-message-form__submit').on('click', function(e) {
    e.preventDefault();
    ajaxMessage();
  });
  $('#file-input').on('change', function() {
    ajaxMessage();
  });
  pageLoad();
});

var lastMessageId;

function buildHTML(message) {
  var image = message.image ? `<img src="${message.image}">` : '' ;
  var html  = `<li class="chat-message" data-id="${message.id}">
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

function pageLoad() {
  if(window.location.href.match(/messages/)) {
    setInterval(autoLoading, 1000);
  }
}

function ajaxMessage() {
  var formData = new FormData($('#new_message').get(0));
  if($('#message_body').val() || $('#file-input').val()){
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
      lastMessageId = data.id
      scroll();
    })
    .fail(function() {
      alert('error');
    });
  }
}

function autoLoading() {
  lastMessageId = $('.chat-message').last().data('id');
  $.ajax({
    type: 'GET',
    url: './messages',
    data: {
      id: lastMessageId
    },
    dataType: 'json'
  })
  .done(function(data) {
    for(var i = 0; i < data.length; i ++) {
      if(lastMessageId != data[i].id) {
        buildHTML(data[i]);
        scroll();
      }
    }
  })
  .fail(function() {});
}
