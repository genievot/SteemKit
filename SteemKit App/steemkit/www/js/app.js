const client = new byteball.Client('wss://byteball.org/bb'); // for test net client
let wif = localStorage.getItem("wif"); // Wif of sender account
$(document).ready(function() {
  $('.tabs').tabs();
  $('#scanqr').click(function() {
    scanQr();
  });
  $('.modal').modal();
  $('#account_wif').html(localStorage.getItem('wif'));
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
          }
          if (text[0] == "witnessupvote") {
            window.open('https://v2.steemconnect.com/sign/account-witness-vote?witness=' + text[1] + '&approve=true', '_blank')

          }
          if (text[0] == "following") {
            window.open('https://v2.steemconnect.com/sign/follow?following=' + text[1], '_blank')

          }
          if (text[0] == "delegate") {
            let amount = parseFloat(text[2] * 1.000);
            window.open('https://v2.steemconnect.com/sign/delegate-vesting-shares?delegatee=' + text[1] + '&vesting_shares=' + amount + '%20SP', '_blank')
          }
          if (text[0] == "upvote") {
            window.open('https://v2.steemconnect.com/sign/vote?author=' + text[1] + '&permlink=' + text[2] + '&weight=100', '_blank')

          }
          if (text[0] == "resteem") {
            window.open('https://v2.steemconnect.com/sign/reblog?author=' + text[1] + '&permlink=' + text[2], '_blank')

          }
          if (text[0] == "byteball") {
            $('#modal2').modal('open');
            $('#account_wif').html(localStorage.getItem("wif"));
            $('#send_bytes').click(function() {
              sendBytes(text[1], text[2]);
            })
          }
        }
      }
    },
    function(error) {
      M.toast({
        html: 'Scanning Error!'
      });
    }
  );
}

function sendBytes(name, amount) {
  localStorage.setItem("wif", $('#account_wif').val())
  wif = localStorage.getItem("wif");
  let params = {
    attestor_address: 'JEDZYC2HMGDBIDQKG3XSTXUSHMCBK725',
    field: 'steem_username',
    value: name
  };
  client.api.getAttestation(params, function(err, result) {
    client.api.getJoint(result, function(err, result) {
      if (result) {
        let params = {
          outputs: [{
            address: result.joint.unit.messages[0].payload.address,
            amount: parseInt(amount)
          }]
        };
        client.post.payment(params, wif, function(err, result) {
            console.log("Result is - " + result,err);
          if (result) {
            M.toast({
              html: 'Payment Done!'
            });
          } else {
            M.toast({
              html: 'Error!'
            });
          }
        });
      } else {
        M.toast({
          html: 'Error!'
        });
      }
    });
  });
}

function getUserInfo() {
  steem.api.getAccounts([$('#user_info').val()], function(err, response) {
    if (response) {
      $('#dvs').text(response[0].delegated_vesting_shares);
      $('#vshares').text(response[0].vesting_shares);
      $('#sbd').text(response[0].sbd_balance);
      $('#steem').text(response[0].balance);
    }
    else{
      M.toast({
        html: 'Error!'
      });
    }
  });
}
