
$("#agregarorden").click(function(){
	$('#mod').modal('show');
});

$("#agregarcliente").click(function(e){
    e.preventDefault();
    $('#mod2').modal('show');
});
$("#scliente").click(function(e){
  e.preventDefault();
  $('#mod').modal('show');
});
$('select.dropdown')
  .dropdown()
;