// Variables
url = 'http://184.72.83.24:5000';
let nombreCliente = document.getElementById('nombreCliente');
let telCliente = document.getElementById('searchTel').value;
var productos=[];
var categorias=[];
var clientes=[];
var roles=[];
var usuarios=[];

// Funciones get
$(function(){
    $.get(url+'/producto',function(data){
        console.log(data.productos);
        productos = data.productos;
        llenarProductos();
    });
});

$(function(){
    $.get(url+'/categoria',function(data){
        console.log(data.categorias);
        categorias = data.categorias;
    });
});

$(function(){
    $.get(url+'/cliente',function(data){
        console.log(data.clientes);
        clientes = data.clientes;
        llenarTelefonos();
    });
});

$(function(){
    $.get(url+'/usuario',function(data){
        console.log(data.usuarios);
        usuarios = data.usuarios;
    });
});

$(function(){
    $.get(url+'/rol',function(data){
        console.log(data.Roles);
        roles = data.Roles;
    });
});

// Funciones varias
function llenarTelefonos(){
    var tels = '';
    var i;
    for(i=0; i<clientes.length; i++){
        tels = '<option value="'+clientes[i].telefono+'">'+clientes[i].telefono+'</option>';
    };
    $('#searchTel').append(tels);
};

function llenarProductos(){
    var tels = '';
    var i;
    for(i=0; i<productos.length; i++){
        tels = '<option value="'+(i+1)+'">'+productos[i].descripcion+'</option>';
    };
    $('#p').append(tels);
};

$('#searchTel').change(function(){
    telCliente = document.getElementById('searchTel').value;
    for(i = 0; i<clientes.length; i++){
        if (telCliente===clientes[i].telefono){
            nombreCliente.value = clientes[i].primerNombre+' '+clientes[i].primerApellido;
        }
    }
});