url = 'http://184.72.83.24:5000';

$(function(){
    $.get(url+'/producto',function(data){
        console.log(data.productos);
    });
});

$(function(){
    $.get(url+'/categoria',function(data){
        console.log(data.categorias);
    });
});

$(function(){
    $.get(url+'/cliente',function(data){
        console.log(data.clientes);
        var a = data.clientes;
        var tels = '';
        var i;
        for(i=0; i<a.length; i++){
            tels = '<option value="'+(i+1)+'">'+a[i].telefono+'</option>';
        };
        $('#searchTel').append(tels);
    });
});

$(function(){
    $.get(url+'/usuario',function(data){
        console.log(data.usuarios);
    });
});

$(function(){
    $.get(url+'/rol',function(data){
        console.log(data.Roles);
    });
});