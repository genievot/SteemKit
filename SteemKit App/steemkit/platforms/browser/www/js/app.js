$(document).ready(function(){
  $('.tabs').tabs();

});
if(localStorage.getItem("LocalData") == null)
{
    var data = [];
    data = JSON.stringify(data);
    localStorage.setItem("LocalData", data);
}

function scanQr(){

}
