var usuarios;
var clientes;
var direcciones;
$(document).ready(function(){
    ordenes();
})

/**
 * 
 */
function ordenes(){
    obtenerClientes();
    obtenerUsuarios();
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
                pintarOrdenes(e.ordenes);
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
                clientes=e.clientes
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
function obtenerUsuarios(){
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
                usuarios=e.usuarios
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
function pintarOrdenes(ordenes){
    for(let i=0;i<ordenes.length; i++){
        let orden=ordenes[i];
        let cliente;
        let usuario;
        let tipoVenta="";
        if(orden.tipo_venta==1){
            tipoVenta="Mayorista"
        }else{
            tipoVenta="Minorista"
        }
        while (true){
            if (clientes!==undefined){
                break;
            }
        }
        for (let i = 0; i < clientes.length; i++) {
            if (orden.cliente_ID===clientes[i].cliente_ID){
                cliente=clientes[i];
                break;
            }
        }
        while(true){
            if (usuarios!==undefined){
                break;
            }
        }
        for (let i = 0; i < usuarios.length; i++) {
            if (orden.usuario_ID===usuarios[i].usuario_ID){
                usuario=usuarios[i];
                break;
            }
        }
        let fechaTotal=orden.fecha_venta.split(",");
        let fecha=fechaTotal[0].split("-");
        let fechaAImprimir=fecha[1]+"/"+fecha[2]+"/"+fecha[0];


        let fechaEntrega=orden.fecha_entrega.split("-");
        let fechaEntregaAMostrar=fechaEntrega[1]+"/"+fechaEntrega[2]+"/"+fechaEntrega[0];
        let txt=`<tr>
        <td>
            ${orden.estado}    
        </td>
        <td>
            ${orden.ordenVenta_ID}   
        </td>
        <td>
            <img src="${usuario.urlImagen}" alt="${usuario.primerNombre} ${usuario.primerApellido}">
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
        <td>
            ${orden.productos}
        </td>
        <td>
            ${orden.modalidadPago.modalidad}
        </td>
        <td>
            ${orden.precio}
        </td>
        <td>
            ${orden.notas}
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