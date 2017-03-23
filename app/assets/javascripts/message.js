$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
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
    </li>`
    $('.chat-messages').append(html);
  }

  $('#chat-message-form__submit').on('click', function(e) {
    e.preventDefault();
    var textField = $('.js-form__text-field');
    var input = textField.val();
    $.ajax({
      type: 'POST',
      url: './messages.json',
      data: {
        message: {
          body: input
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      buildHTML(data);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });
});
