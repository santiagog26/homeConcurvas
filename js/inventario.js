$(document).ready(function(){
    
});


$('#agregarProductoNuevo').click(function(e){
    e.preventDefault();
    let producto;
    producto={
        referenciaProducto: $('#txtMotivo').val(),
        descripcion: $('#txtOrigen').val(),
        urlImagen: $('#txtModalidadPago').val(),
        stock: $('#txtMetodoCompra').val(),
        precioCosto: clienteDeOrden.direccion_ID,
        precioVenta: clienteDeOrden.cliente_ID,
        precioMayorista: usuarioEnSesion.usuario_ID,
        categorias:[]
    }
});

function crearProducto(){
        $.ajax({
            url: url+'/orden',
            type: 'POST',
            headers:{
                token:token
            },
            data: productoueva,
            dataType:"json",
            contentType: 'application/json; charset=utf-8', 
            success: function(e){
                alert('Orden creada');
            },
            error: function(e){
                console.log(e)
            }
        })
}

