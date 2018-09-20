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
let url="URL";
function createQR() {
  if($('#frame_one').is(":visible")){  // To Transfer
    let _name = $('#user_name').val();
    let _amount = $('#amount_value').val();
    let _memo = $('#memo_text').val();
    url= "https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=transfer$"+_name+"$"+_amount+"$"+_memo.replace(/&+/g,"and");
  }

  if($('#frame_two').is(":visible")){
    let _name = $('#witness_name').val();
    url= "https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=witnessUpvote$"+_name;
  }
  if($('#frame_three').is(":visible")){
    let _name = $('#follow_name').val();
    url= "https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=witnessUpvote$"+_name;
  }

  $('#url_to_show').text(url.split(/ +/g))
  pArea = document.getElementById("url_to_show").textContent;
  $('#qrImg').attr('src', url.split(/ +/g))
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
