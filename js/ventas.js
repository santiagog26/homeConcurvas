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
 * @param {number} id 
 */
function consultarDirecciones(){
    $.ajax({
        url: url+'/direccion',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            if (e.tipo==="OK"){
                direcciones=e.direcciones
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
        let direccion;
        consultarDireccion(direccion,orden.direccion_ID)
        let cliente;
        let usuario;
        while (true){
            if (clientes!==null){
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
            if (usuarios!==null){
                break;
            }
        }
        while(true){
            if (direcciones!==null){
                break;
            }
        }
        for (let i = 0; i < usuarios.length; i++) {
            if (orden.usuario_ID===usuarios[i].usuario_ID){
                usuario=usuarios[i];
                break;
            }
        }
        for (let i = 0; i < direcciones.length; i++) {
            if (orden.direccion_ID===direcciones[i].direccion_ID){
                direccion=direcciones[i];
                break;
            }
        }
        let fechaTotal=orden.fecha_venta.split(",");
        let fecha=fechaTotal[0].split("-");
        let fechaAImprimir=fecha[1]+"/"+fecha[2]+"/"+fecha[0];


        let fechaEntrega=orden.fecha_entrega.split("-");
        let fechaEntregaAMostrar=fechaEntrega[1]+"/"+fechaEntrega[2]+"/"+fechaEntrega[0]+"/";
        let txt=`<tr>
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
            ${direccion.direccion}
        </td>
        <td>
            ${orden.estado}
        </td>
        <td>
            ${fechaEntregaAMostrar}
        </td>
        <td>
            <img src="${usuario.urlImagen}" alt="${usuario.primerNombre} ${usuario.primerApellido}">
        </td>
        <td>
            <img src="img/avatar.png" alt="Avatar">
        </td>
        <td>
            <button class= "boton" type="button " class="submit-btn">Ver historia </button>
        </td>
    </tr>`
    $("table").append(txt);
    txt="";
    }
}