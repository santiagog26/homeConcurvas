
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

$('.ui.dropdown')
  .dropdown()
;
$('select.dropdown')
  .dropdown()
;
$('#xv').click(function(){
  $('#v').remove();
});
$("#agregarproducto").click(function(){
  $('#mod4').modal('show');
});


