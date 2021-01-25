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
            <button id="${orden.ordenVenta_ID}" class= "boton" type="button " class="submit-btn">Ver historia </button>
        </td>`
    $("table").append(txt);
    txt="";
    modalorden(orden.ordenVenta_ID);
    }
}

function modalorden(e){
    $("#"+e).click(function(){
        mostrar_modal(e);
        $('#mod'+e).modal('show');
      });
  }

  function mostrar_modal(e){
    texto=  ' <div class="ui modal" id="mod"'+e+'>'+
                '<div class="header"><i class="cart plus icon"></i> Orden de venta</div>'+
                '<div class="content">'+
                   '<form class="ui form">'+
                        '<h4 class="ui dividing header"></h4>'+
                        '<div class="field">'+
                            '<label>Cliente</label>'+
                            '<div class="two fields">'+
                                '<div class="field">'+
                                    '<select id="searchTel" class="ui fluid search dropdown">'+
                                        '<option value="">Número de Telefono </option>'+
                                    '</select>'+
                                '</div>'+
                                '<div class="field">'+
                                    '<input type="text" name="Nombre_Cliente" value="" placeholder="Nombre" readonly>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="field">'+
                            '<label>Método de Compra</label>'+
                            '<select class="ui fluid dropdown" >'+
                                '<option value="">Método de Compra</option>'+
                            '</select>'+
                        '</div>'+
                        '<div class="ui form">'+
                            '<div class="inline fields">'+
                                '<label>Tipo de Venta : </label>'+
                                '<div class="field">'+
                                    '<div class="ui radio checkbox">'+
                                        '<input type="radio" name="frequency" checked="checked">'+
                                        '<label>Detal</label>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="field">'+
                                    '<div class="ui radio checkbox">'+
                                        '<input type="radio" name="frequency">'+
                                        '<label>Por Mayor</label>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="field">'+
                            '<label>Prenda</label>'+
                            '<button id="productos" class="ui button "> <i class="shopping cart icon"></i></button>'+
                        '</div>'+
                        '<div class="field">'+
                            '<label>Modalidad de pago</label>'+  
                            '<select class="ui fluid dropdown" >'+
                                '<option value="">Modalidad de pago</option>'+
                            '</select>'+
                        '</div>'+
                        '<div class="field">'+
                            '<label>Precio</label>'+
                            '<input type="text" name="precio_orden_venta" value="" placeholder="Precio" readonly>'+
                        '</div>'+
                        '<div class="field">'+
                            '<div class="two fields">'+
                                '<div class="field">'+
                                    '<label>Motivo</label>'+  
                                    '<select class="ui fluid dropdown" >'+ 
                                        '<option value="">Motivo</option>'+
                                    '</select>'+
                                '</div>'+
                                '<div class="field">'+
                                    '<label>Origen</label>'+
                                    '<select class="ui fluid dropdown" > '+
                                        '<option value="">Origen</option>'+
                                    '</select>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="field">'+
                            '<label>Fecha de Entrega</label>'+
                            '<input type="date" id="start" name="trip-start "value=""  min="2021-01-01" max="2220-12-31">'+
                        '</div>'+
                        '<div class="field">'+
                            '<label>Notas</label>'+
                            '<textarea rows="3"></textarea>'+
                        '</div>'+
                        '<button id="agregarcliente" class="ui button"> <i class="plus icon"></i>   Agregar Ciente</button>'+
                    '</form>'+ 
                '</div>'+
                '<div class="ui modal" id="mod3">'+
                    '<div class="header"><i class="cart plus icon"></i> Pedido</div>'+
                    '<div class="content">'+
                        '<div id="Pedido" class="ui form">'+
                            '<div class="four fields" >'+
                                '<div class="field can">'+
                                    '<label class="escan">Descripcion del Producto</label>'+
                                '</div>'+
                                '<div class="field can">'+
                                    '<label class="escan">Cantidad</label>'+
                                '</div>'+
                                '<div class="field can">'+
                                    '<label class="escan">Precio</label>'+
                                '</div>'+
                                '<div class="field can x">'+
                                '</div>'+
                            '</div>'+
                            '<div class="four fields" id="v">'+
                                '<div class="field can">'+
                                    '<select id ="p" class="ui fluid search dropdown">'+
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
                                    '<i id="xv" class="xv2 times circle outline icon"></i>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<button id="agregarpedi" class="ui button "> Agregar Productos</button>'+
                    '</div>'+
                '</div>'+
            '</div>'
          $("#vermasorden").append(texto);
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
                llenarModalidadesDePago(e.modalidades);
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


function llenarModalidadesDePago(modalidades){
    let txt = '';
    for(let i=0; i<modalidades.length; i++){
        txt+='<div class="item" data-value="'+modalidades[i].modalidad_pago_ID+'">'+modalidades[i].modalidad+'</div>';
    };
    $('#ModalidadPagoDropdown').append(txt);
}