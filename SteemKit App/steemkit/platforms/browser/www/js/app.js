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
          let text = result.text.trim().split('$');
          if (text[0] == "transfer") {
            let amount = parseFloat(text[2] * 1.000);
            window.open('https://v2.steemconnect.com/sign/transfer?to=' + text[1] + '&amount=' + amount + '%20STEEM', '_blank')
            $('#hello2').html("transfer - " + text + " - " + amount);
          }
          if (text[0] == "witnessupvote") {
            window.open('https://v2.steemconnect.com/sign/account-witness-vote?witness=' + text[1] + '&approve=true', '_blank')
            $('#hello2').html("witness upvote - " + text);
          }
          if (text[0] == "following") {
            window.open('https://v2.steemconnect.com/sign/follow?following='+text[1], '_blank')
            $('#hello2').html("Following - " + text);
          }
          if (text[0] == "delegate") {
            let amount = parseFloat(text[2] * 1.000);
            window.open('https://v2.steemconnect.com/sign/delegate-vesting-shares?delegatee='+text[1]+'&vesting_shares='+amount+'%20SP', '_blank')
            $('#hello2').html("delegate - " + text);
          }
          if (text[0] == "upvote") {
            window.open('https://v2.steemconnect.com/sign/vote?author='+text[1]+'&permlink='+text[2]+'&weight=100', '_blank')
            $('#hello2').html("Upvoting Post - " + text);
          }
          if (text[0] == "resteem") {
            window.open('https://v2.steemconnect.com/sign/reblog?author='+text[1]+'&permlink='+text[2], '_blank')
            $('#hello2').html("Resteeming - " + text);
          }
          // Delegate steem power https://v2.steemconnect.com/sign/delegate-vesting-shares?delegatee=steem-ua&vesting_shares=100%20SP
          // Upvote with a weight https://v2.steemconnect.com/sign/vote?author=genievot&permlink=byteball-use-a-thon-listing-my-entries-and-plans-for-use-a-thon-1536858742505&weight=100
          // ReBlog a post https://v2.steemconnect.com/sign/reblog?author=genievot&permlink=byteball-use-a-thon-listing-my-entries-and-plans-for-use-a-thon-1536858742505
        }
      }

    },
    function(error) {
      alert("Scanning failed: " + error);
    }
  );
}
