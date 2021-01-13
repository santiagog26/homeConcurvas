
$("#agregarorden").click(function(){
	$('#mod').modal('show');
});

$("#agregarcliente").click(function(e){
    e.preventDefault();
    $('#mod2').modal('show');
});
$("#atras").click(function(e){
  e.preventDefault();
  $('#mod').modal('show');
});
$("#productos").click(function(e){
  e.preventDefault();
  $('#mod3').modal('show');
});
$('select.dropdown')
  .dropdown()
;

$('.ui.dropdown')
  .dropdown()
;