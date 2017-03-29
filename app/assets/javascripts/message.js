$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    if(message.image) {
      var image = `<img src="${message.image}">`
    } else {
      var image = ''
    }
    var html = 
    `<li class="chat-message">
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

  $('#chat-message-form__submit').on('click', function(e) {
    e.preventDefault();
    var fd = new FormData($('#new_message').get(0));
    $.ajax({
      type: 'POST',
      url: './messages',
      data: fd,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data) {
      buildHTML(data);
      $('.js-form__text-field').val('');
    })
    .fail(function() {
      alert('error');
    });
  });
});
