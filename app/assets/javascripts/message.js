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
    $.each(data, function(i, message) {
      buildHTML(message);
      scroll();
    });
  });
}

function pageLoad() {
  if(window.location.href.match(/messages/)) {
    setInterval(autoLoading, 1000);
  }
}

$(document).on('turbolinks:load', function() {
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    if($('#message_body').val() || $('#file-input').val()){
      $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json'
      })
      .done(function(data) {
        buildHTML(data);
        scroll();
      })
      .fail(function() {
        alert('error');
      });
    }
    $(this).get(0).reset();
    return false;
  });
  pageLoad();
});
