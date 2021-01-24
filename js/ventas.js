
$(document).ready(obtenerClientes())

/**
 * 
 */
function ordenes(clientes,usuarios){
    $.ajax({
        url: url+'/orden',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                pintarOrdenes(e.ordenes,clientes,usuarios);
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
/**
 * 
 */
function obtenerClientes(){
    $.ajax({
        url: url+'/cliente',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                let clientes=e.clientes
                obtenerUsuarios(clientes);
                llenarTelefonos(clientes);
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


/**
 * 
 */
function obtenerUsuarios(clientes){
    $.ajax({
        url: url+'/usuario',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                let usuarios=e.usuarios
                ordenes(clientes,usuarios);
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

/**
 * 
 * @param {Array} ordenes 
 */
function pintarOrdenes(ordenes,clientes,usuarios){
    for(let i=0;i<ordenes.length; i++){
        let orden=ordenes[i];
        let cliente;
        let vendedor;
        let tipoVenta="";
        if(orden.tipo_venta==1){
            tipoVenta="Mayorista"
        }else{
            tipoVenta="Minorista"
        }
        for (let i = 0; i < clientes.length; i++) {
            if (orden.cliente_ID===clientes[i].cliente_ID){
                cliente=clientes[i];
                break;
            }
        }
        for (let i = 0; i < usuarios.length; i++) {
            if (orden.usuario_ID===usuarios[i].usuario_ID){
                vendedor=usuarios[i];
                break;
            }
        }
        let fechaTotal=orden.fecha_venta.split(",");
        let fecha=fechaTotal[0].split("-");
        let fechaAImprimir=fecha[1]+"/"+fecha[2]+"/"+fecha[0];


        let fechaEntrega=orden.fecha_entrega.split("-");
        let fechaEntregaAMostrar=fechaEntrega[1]+"/"+fechaEntrega[2]+"/"+fechaEntrega[0];
        let str=productosEnOrdenString(orden.productos);
        let txt=`<tr>
        <td>
            ${orden.estado}    
        </td>
        <td>
            ${orden.ordenVenta_ID}   
        </td>
        <td>
            <img src="${vendedor.urlImagen}" alt="${vendedor.primerNombre} ${vendedor.primerApellido}">
        </td>
        <td>
            ${fechaAImprimir}    
        </td>
        <td>
            ${cliente.primerNombre} ${cliente.primerApellido}
        </td>
        <td>
            ${cliente.telefono}
        </td>
        <td>
            ${orden.direccion.direccion}
        </td>
        <td>
            ${orden.direccion.barrio}
        </td>
        <td>
            ${orden.direccion.ciudad.nombre}.
        </td>
        <td>
            ${orden.direccion.departamento.departamento}
        </td>
        <td>
            ${orden.metodoCompra.tipo}
        </td>
        <td class="ui grid">
            ${str}
        </td>
        <td>
            ${orden.modalidadPago.modalidad}
        </td>
        <td>
           $ ${orden.precio}
        </td>
        <td>
            ${orden.nota}
        </td>
        <td>
            ${tipoVenta}
        </td>
        <td>
            ${orden.origen.nombre}
        </td>
        <td>
            ${fechaEntregaAMostrar}
        </td>
        <td>
            <button class= "boton" type="button " class="submit-btn">Ver historia </button>
        </td>`
    $("table").append(txt);
    txt="";
    }
}



function productosEnOrdenString(productos){
    let str=''
    for(let i=0;i<productos.length;i++){
        let producto=productos[i]
        str+= `
        <div class="row">
            ${producto.producto.descripcion} (${producto.cantidad})
        </div>`
    }
    return str;
}

/**
 * Funciones varias
 * @param {*} clientes 
 */
function llenarTelefonos(clientes){
    let tels = '';
    for(let i=0; i<clientes.length; i++){
        tels = '<option value="'+clientes[i].telefono+'">'+clientes[i].telefono+'</option>';
    };
    $('#searchTel').append(tels);
};

$(".ui.fluid.search.dropdown.selection").on("click",function(){
    let telefono=$(".text").val();
    $.ajax({
        url: url+'/cliente/'+telefono,
        type: 'POST',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        before: function(e){
            $("#Nombre_Cliente").empty();
        },
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                cliente=e.cliente
                $("#Nombre_Cliente").append(`${cliente.primerNombre} ${cliente.primerApellido}`);
            }
            else{
                alert(e.mensaje);
            }
            
        },
        error: function(e){
            console.log(e)
        }
    })
})