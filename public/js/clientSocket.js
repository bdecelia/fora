
let socket = io.connect('/');

socket.on('players', function (data) {
  console.log(data);
});

socket.on('newMessage', function (data) {
  let msg = data.message;
  $('#chat').append(`<tr><td>${msg}</td></tr>`);

  let $el = $(".table-responsive");
  $el.scrollTop($el.prop("scrollHeight")-$el.innerHeight());
});

socket.on('updateReacts', function(data){
  $("#wowCount").text(data.wow);
  $("#smileCount").text(data.smile);
  $("#mehCount").text(data.meh);
  $("#frownCount").text(data.frown);
});

function chatHandler(event) {
  let message = $("#message").val();
  socket.emit("message", { message: "<b>" + user + ": </b>" + message });
  $("#message").val("");
  event.preventDefault();
}

$("#chatForm").submit(chatHandler);

