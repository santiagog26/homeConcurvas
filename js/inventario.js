var categoriasGlobal;
var productosGlobal;
$(document).ready(function(){
    cargarCategorias();
});


$('#agregarProductoNuevo').click(function(e){
    e.preventDefault();
    var imgInfo=$("#imagenProducto")[0];
    let producto={
        referenciaProducto: $('#referenciaProducto').val(),
        descripcion: $('#txtDescripcion').val(),
        stock: $('#txtStock').val(),
        precioCosto: $('#txtPrecioCosto').val(),
        precioVenta: $('#txtPrecioVenta').val(),
        precioMayorista: $('#txtPrecioMayorista').val(),
        categorias:$("#categorias").val()
    }
    
    if(imgInfo!==undefined){
        let name=imgInfo.files[0].name;
        let arr=name.split(".");
        let ext=arr[arr.length-1];
        producto.urlImagen="img/producto/"+producto.referenciaProducto+"."+ext;
        console.log(producto);
        crearProducto(producto);
        let form=$("#formProducto")[0];
        var fd = new FormData(form);
        agregarImagen(fd,producto.referenciaProducto+"."+ext);
    }else{
        crearProducto(producto);
    }
    
    
});

function crearProducto(obj){
        $.ajax({
            url: url+'/producto',
            type: 'POST',
            headers:{
                token:getCookie("token")
            },
            data: JSON.stringify(obj),
            dataType:"json",
            contentType: 'application/json; charset=utf-8', 
            success: function(e){
                alert(e.mensaje);
            },
            error: function(e){
                console.log(e)
            }
        })
}

function agregarImagen(formObj,fileName){
    $.ajax({
        type: 'POST',
        url: url+'/imgProducto',
        headers:{
            token:getCookie("token"),
            fileName:fileName
        },
        data: formObj,
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        success: function(e){
            console.log(e.file);
        }
    });
}

function cargarCategorias(){
    $.ajax({
        url: url+'/categoria',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                categoriasGlobal=e.categorias;
                pintarCategorias(e.categorias);
            }
            else{
                alert(e.mensaje);
            }
            
        },
        error: function(e){
            console.log(e)
        }
    })
}


function pintarCategorias(categorias){
    let txt='';
    txt='<option value="">Categorías</option>';
    $("#categorias").append(txt);
    for (let i = 0; i < categorias.length; i++) {
        txt='<option value="'+categorias[i].id+'">'+categorias[i].nombre+'</option>';
        $("#categorias").append(txt);
    }
}