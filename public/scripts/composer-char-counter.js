$(document).ready(function() {
  $("textarea[name='text']").keyup(function(e) {
    const counter = $(this).parent().children().children('.counter');
    $(counter).html(() => {
      return 140 - $(this).val().length;
    })
  });
});