$(document).ready(function() {
  $('select').formSelect();
  $('#url_to_show').hide();

  let pArea;
  $('#frame_one').hide();
  $('#frame_two').hide();
  $('#frame_three').hide();
  $('#copy_btn').hide();
});


function frameShow(frame_val) {
  if (frame_val == "one") {
    $('#frame_one').show();
    $('#frame_two').hide();
    $('#frame_three').hide();

    $('#copy_btn').show();
  } else if (frame_val == "two") {
    $('#frame_one').hide();
    $('#frame_two').show();
    $('#frame_three').hide();

    $('#copy_btn').show();
  } else if (frame_val == "three") {
    $('#frame_one').hide();
    $('#frame_two').hide();
    $('#frame_three').show();

    $('#copy_btn').show();
  } else {
    M.toast({
      html: 'Select right value!'
    });
  }
}

function createQR() {

  $('#url_to_show').text("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example")
  pArea = document.getElementById("url_to_show").textContent;
  $('#url_to_show').show();
}

function copyToClipboard() {
  if ($('#url_to_show').is(":visible")) {
    const el = document.createElement('textarea');
    el.value = pArea;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    M.toast({
      html: 'Copied!'
    });
  } else {
    M.toast({
      html: 'Create QR First!'
    });
  }
}
