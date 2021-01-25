var x=0;
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
$("#agregarpedi").click(function(e){
  e.preventDefault();
  mostrar_productos(x);
  x=x+1;
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


function mostrar_productos(e){
  texto=  '<div class="four fields " id="v'+e+'">'+
            '<div class="field can">'+
              '<select class="ui fluid search dropdown">'+
                '<option value="">Descripcion del Producto</option>'+
                '<option value="1">buzos</option>'+
                '<option value="2">chaquetas</option>'+
              '</select>'+
            '</div>'+
            '<div class="field can">'+
              '<div id="cantidad1">'+
                '<div class="mas-menos">'+
                  '<i class="minus circle icon"></i>'+
                '</div>'+
              '<div>'+
                '<input id="cantidad" type="text" name="Catidad" value=""  placeholder="1" readonly>'+
              '</div>'+
              '<div class="mas-menos">'+
                '<i class="plus circle icon"></i>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="field can">'+
            '<input type="text" placeholder="">'+
          '</div>'+
          '<div class="field can x">'+
            '<i id="xv'+e+'" class="xv2 times circle outline icon"></i>'+
          '</div>'+
        '</div>'+
        '<script>'+
        '$(".ui.dropdown")'+
          '.dropdown();'+
        '</script>'
        $("#Pedido").append(texto);
        eliminar_productos(e);
}

function eliminar_productos(e){
  $('#xv'+e).click(function(){
    $('#v'+e).remove();
  });
}