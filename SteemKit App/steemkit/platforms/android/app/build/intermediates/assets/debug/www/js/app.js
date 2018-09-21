$(document).ready(function() {
  $('.tabs').tabs();
  $('h5').html("Hellosd");
  $('#scanqr').click(function() {
    scanQr();
  });

});
if (localStorage.getItem("LocalData") == null) {
  var data = [];
  data = JSON.stringify(data);
  localStorage.setItem("LocalData", data);
}

function scanQr() {

  cordova.plugins.barcodeScanner.scan(
    function(result) {
      if (!result.cancelled) {
        $('#hello').html("Didn't cancelled");
        if (result.format == "QR_CODE") {
          $('#hello2').html("wasqrCode");
          $('#hello3').html(result.text + " - " + result.format + " - " + result.cancelled);
          let text = result.text.split('$');
          let amount = parseFloat(text[2]*1.000);
          if (text[0] == "transfer") {
            window.open('https://v2.steemconnect.com/sign/transfer?to='+text[1]+'&amount='+amount+'%20STEEM', '_blank')
            $('#hello2').html("tesnfer - " + text +" - "+ amount);
          }
        }
      }

    },
    function(error) {
      alert("Scanning failed: " + error);
    }
  );
}
