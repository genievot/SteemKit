$(document).ready(function(){
  $('.tabs').tabs();
  $('h5').html("Hellosd");
  $('#scanqr').click(function(){
    scanQr();
  });

});
if(localStorage.getItem("LocalData") == null)
{
    var data = [];
    data = JSON.stringify(data);
    localStorage.setItem("LocalData", data);
}

function scanQr(){
  cordova.plugins.barcodeScanner.scan(
          function (result) {
              if(!result.cancelled)
              {
                  $('#hello').html("Didn't cancelled");
                  if(result.format == "QR_CODE")
                  {
                    $('#hello2').html("wasqrCode");
                    $('#hello3').html(result.text + " - " + result.format +" - "+ result.cancelled);
                      // navigator.notification.prompt("Please enter name of data",  function(input){
                      //     var name = input.input1;
                      //     var value = result.text;
                      //
                      //     var data = localStorage.getItem("LocalData");
                      //     console.log(data);
                      //     data = JSON.parse(data);
                      //     data[data.length] = [name, value];
                      //
                      //     localStorage.setItem("LocalData", JSON.stringify(data));
                      //
                      //     alert("Done");
                      // });
                  }
              }
          },
          function (error) {
              alert("Scanning failed: " + error);
          }
     );
}
