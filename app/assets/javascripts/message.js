$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var image = `<img src="${message.image}">`
    if(message.image == null) {
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

  function ajax() {
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
    })
    .fail(function() {
      alert('error');
    });
  }

  $('#chat-message-form__submit').on('click', function(e) {
    e.preventDefault();
    ajax();
  });
  $('#file-input').on('change', function() {
    ajax();
  });
});
