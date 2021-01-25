var clientesGlobal;
var metodosDeCompraGlobal;
var motivosDeVentaGlobal;
$(document).ready(obtenerClientes())



$("#searchTel").click(function(){
    let cliente;
    let telefono=$("#txtTelefono").val();
    for (let i = 0; i < clientesGlobal.length; i++) {
        if(clientesGlobal[i].telefono===telefono){
            cliente=clientesGlobal[i];
            break;
        }
    }
    $("#Nombre_Cliente").val(`${cliente.primerNombre} ${cliente.primerApellido}`);
});
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
            if (e.tipo==="OK"){
                obtenerUsuarios(e.clientes);
                llenarTelefonos(e.clientes);
                clientesGlobal=e.clientes
                metodosDeCompra();
                motivosDeVenta();
                modalidadPago();
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
        tels+='<div class="item" data-value="'+clientes[i].telefono+'">'+clientes[i].telefono+'</div>';
    };
    $('#searchTelDropdown').append(tels);
};

function metodosDeCompra(){
    $.ajax({
        url: url+'/metodoCompra',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                llenarMetodosDeCompra(e.metodos);
                metodosDeCompraGlobal=e.metodos;
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

function llenarMetodosDeCompra(metodos){
    let txt = '';
    for(let i=0; i<metodos.length; i++){
        txt+='<div class="item" data-value="'+metodos[i].metodo_compra_ID+'">'+metodos[i].tipo+'</div>';
    };
    $('#MetodoCompraDropdown').append(txt);
}

function motivosDeVenta(){
    $.ajax({
        url: url+'/motivo',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                let motivosDeVenta=[];
                
                for (let i = 0; i < e.motivos.length; i++) {
                    
                    if(e.motivos[i].tipo==="Venta"){
                        motivosDeVenta.push(e.motivos[i]);
                    }
                }
                motivosDeVentaGlobal=motivosDeVenta;
                llenarMotivosDeVenta(motivosDeVenta);
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

function llenarMotivosDeVenta(motivosDeVenta){
    let txt = '';
    for(let i=0; i<motivosDeVenta.length; i++){
        txt+='<div class="item" data-value="'+motivosDeVenta[i].motivo_ID+'">'+motivosDeVenta[i].motivo+'</div>';
    };
    $('#MotivoDropdown').append(txt);
}

function modalidadPago(){
    $.ajax({
        url: url+'/modalidadPago',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                let motivosDeVenta=[];
                for (let i = 0; i < e.motivos.length; i++) {
                    
                    if(e.motivos[i].tipo==="Venta"){
                        motivosDeVenta.push(e.motivos[i]);
                    }
                }
                motivosDeVentaGlobal=motivosDeVenta;
                llenarMotivosDeVenta(motivosDeVenta);
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