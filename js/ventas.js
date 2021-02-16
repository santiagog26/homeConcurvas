var clientesGlobal;
var x=0;
var productosGlobal;
var strProductosEnDropdown;
var departamentosGlobal
var ciudadesGlobal;

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
            if (e.tipo==="OK"){
                pintarOrdenes(e.ordenes,clientes,usuarios);
            }
            else{
                alert(e.mensaje);
            }
            
        },
        error: function(e){
            console.log(e)
        },
        complete: function(e){
            clearConsole();
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
                obtenerProductos();
                origen();
                obtenerDepartamentosYCiudades();
                
            }
            else{
                alert(e.mensaje);
            }
            
        },
        error: function(e){
            console.log(e)
        },
        complete: function(e){
            clearConsole();
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
        },
        complete: function(e){
            clearConsole();
        }
    })
}

/**
 * 
 * @param {Array} ordenes 
 */
function pintarOrdenes(ordenes,clientes,usuarios){
    for(let i=ordenes.length;i>0; i--){
        let orden=ordenes[i-1];
        let cliente;
        let vendedor;
        let tipoVenta="";
        if(orden.tipo_venta===1){
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
        <td class="ui grid " id="procenter" >
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
        $("#vermasorden").empty();
        mostrar_modal(e);
        modalagrepro(e);
        agregarproductos(e);
        $('#m'+e).modal('show');
    });
  }
  function modalagrepro(e){
    $("#productos"+e).click(function(e){
        e.preventDefault();
    });
    $("#productos"+e).click(function(){
        $('#modp'+e).modal('show');
    });
  }
  function agregarproductos(e){
    $("#agregarpedi2"+e).click(function(){
        mostrar_productos2(e);
    });
  }
  function mostrar_modal(e){
   let texto=  ' <div class="ui modal" id="m'+e+'">'+
                '<div class="header"><i class="cart plus icon"></i> Orden de venta</div>'+
                '<div class="content">'+
                   '<form class="ui form">'+
                        '<h4 class="ui dividing header"></h4>'+
                        '<div class="field">'+
                            '<label>Cliente</label>'+
                            '<div class="two fields">'+
                                '<div class="field">'+
                                    '<input type="text" name="telefono_cliente" value="" placeholder="Telefono" readonly>'+
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
                            '<button id="productos'+e+'" class="ui button "> <i class="shopping cart icon"></i></button>'+
                        '</div>'+
                        '<div class="two fields">'+
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
                '<div class="ui modal" id="modp'+e+'">'+
                    '<div class="header"><i class="cart plus icon"></i> Pedido</div>'+
                    '<div class="content">'+
                        '<div id="Pedido'+e+'" class="ui form">'+
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
                        '<button id="agregarpedi2'+e+'" class="ui button "> Agregar Productos</button>'+
                    '</div>'+
                '</div>'+
            '</div>'
          $("#vermasorden").append(texto);
  }
  function mostrar_productos2(e){
    let texto=  '<div class="four fields " id="v2'+e+'">'+
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
              '<i id="xv2'+e+'" class="xv2 times circle outline icon"></i>'+
            '</div>'+
          '</div>'
          $("#Pedido"+e).append(texto);
          eliminar_productos(e);
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
        },
        complete: function(e){
            clearConsole();
        }
    })
}

/**
 * Función que permite llenar métodos de compra
 * @param {Array} metodos 
 */
function llenarMetodosDeCompra(metodos){
    let txt = '';
    for(let i=0; i<metodos.length; i++){
        txt+='<div class="item" data-value="'+metodos[i].metodo_compra_ID+'">'+metodos[i].tipo+'</div>';
    };
    $('#MetodoCompraDropdown').append(txt);
}

/**
 * Función que permite cargar los motivos de venta
 */
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
        },
        complete: function(e){
            clearConsole();
        }
    })
}

/**
 * Función que permite llenar los motivos de venta en un dropdown
 * @param {Array} motivosDeVenta 
 */
function llenarMotivosDeVenta(motivosDeVenta){
    let txt = '';
    for(let i=0; i<motivosDeVenta.length; i++){
        txt+='<div class="item" data-value="'+motivosDeVenta[i].motivo_ID+'">'+motivosDeVenta[i].motivo+'</div>';
    };
    $('#MotivoDropdown').append(txt);
}

/**
 * Función que permite cargar modalidades de pago
 */
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
            if (e.tipo==="OK"){
                llenarModalidadesDePago(e.modalidades);
            }
            else{
                alert(e.mensaje);
            }
            
        },
        error: function(e){
            console.log(e)
        },
        complete: function(e){
            clearConsole();
        }
    })
}

/**
 * Función que permite cargar modalidades de pago
 * @param {Array} modalidades 
 */
function llenarModalidadesDePago(modalidades){
    let txt = '';
    for(let i=0; i<modalidades.length; i++){
        txt+='<div class="item" data-value="'+modalidades[i].modalidad_pago_ID+'">'+modalidades[i].modalidad+'</div>';
    };
    $('#ModalidadPagoDropdown').append(txt);
}

/**
 * Función que permite cargar los productos
 */

function obtenerProductos(){
    $.ajax({
        url: url+'/producto',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            if (e.tipo==="OK"){
                productosGlobal=e.productos;
                modificarDropdownProductos(e.productos);
            }
            else{
                alert(e.mensaje);
            }
            
        },
        error: function(e){
            console.log(e)
        },
        complete: function(e){
            clearConsole();
        }
    })
}

function origen(){
    $.ajax({
        url: url+'/origen',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            if (e.tipo==="OK"){
                llenarOrigen(e.origenes);
            }
            else{
                alert(e.mensaje);
            }
            
        },
        error: function(e){
            console.log(e)
        },
        complete: function(e){
            clearConsole();
        }
    })
}


function modificarDropdownProductos(productos){
    strProductosEnDropdown="";
    for (let i = 0; i < productos.length; i++) {
        let producto= productos[i];
        strProductosEnDropdown+='<div class="item" data-value="'+producto.referenciaProducto+'">'+producto.descripcion+'</div>';
    }
    mostrar_productos(x);
    x=x+1;
}

$("#agregarpedi").click(function(e){
    e.preventDefault();
    mostrar_productos(x);
    x=x+1;
  });

function mostrar_productos(e){
texto=  '<div class="four fields productoEnOrden" id="v'+e+'">'+
            '<div class="field can">'+
                '<div class="ui search selection dropdown">'+
                '<input class="txtProductoEnOrden" type="hidden">'+ 
                '<i class="dropdown icon"></i>'   +
                '<div class="default text">Descripción del producto</div>'+
                    '<div class="menu">'+
                        strProductosEnDropdown+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="field can">'+
                '<div id="cantidad1">'+
                    '<button class="circular ui icon button mas-menos">'+
                        '<i class="minus circle icon"></i>'+
                    '</button>'+
                    '<div>'+
                        '<input id="cantidad" type="text" name="Catidad" value="0" readonly>'+
                    '</div>'+
                    '<button class="circular ui icon button mas-menos">'+
                        '<i class="plus circle icon"></i>'+
                    '</button>'+
                '</div>'+
            '</div>'+
            '<div class="field can">'+
                '<input type="text" placeholder="" value="0">'+
            '</div>'+
            '<div class="field can x">'+
                '<button class="circular ui icon button eliminar">'+
                    '<i class="times circle outline icon"></i>'+
                '</button>'+
            '</div>'+
        '</div>'+
        '<script>'+
        '$(".ui.dropdown")'+
        '.dropdown();'+
        '</script>'
        $("#Pedido").append(texto);
        eliminar_productos();
        sumarYRestar();
}

function eliminar_productos(){
    $('.circular.ui.icon.button.eliminar').click(function(){
        let campos=$(this).parent().parent();
        let camposHijo=$(campos).children();
        let campoPrecio=$(camposHijo[2]);
        let txtPrecio=$(campoPrecio).children();
        let precio=$(txtPrecio).val();
        if($("#precio").val()!==""){
            $("#precio").val(parseFloat($("#precio").val())-parseFloat(precio));
        }
        $(camposHijo).parent().remove();
    })}

function sumarYRestar(){
    $(".circular.ui.icon.button.mas-menos").off("click");
    $(".circular.ui.icon.button.mas-menos").click(function(){
        let elBotonPresionado=this;
        let elIcono=$(elBotonPresionado).children();
        let padre=$(this).parent();
        let hijos=$(padre).children()
        let txtCantidad=$(hijos[1]).children();
        
        let elPadreTotal=$(padre).parent().parent();
        let losHijosDelPadreTotal=$(elPadreTotal).children();
        let txtPrecioIndividual=$(losHijosDelPadreTotal[2]).children();


        let divDropdown=$(losHijosDelPadreTotal[0]).children().children();
        let referenciaProducto=$(divDropdown[0]).val();
        if(referenciaProducto ===""){
            alert("Debe elegir un producto.");
        }else{
            if($(elIcono).hasClass("plus")){
                $(txtCantidad).val(parseInt($(txtCantidad).val(),10)+1);
            }else{
                if(parseFloat($(txtCantidad).val())<=1){
                    alert("Debe establecer cantidades no negativas");
                }else{
                    $(txtCantidad).val(parseInt($(txtCantidad).val(),10)-1);
                }
            }
            let producto=consultarProductoIndividual(referenciaProducto);
            $(txtPrecioIndividual).val(parseFloat($(txtCantidad).val()*producto.precioVenta));
        }
        calcularPrecioTotal();
    });
}

function llenarOrigen(origenes){
    let txt = '';
    for(let i=0; i<origenes.length; i++){
        txt+='<div class="item" data-value="'+origenes[i].origen_ID+'">'+origenes[i].nombre+'</div>';
    };
    $('#OrigenDropdown').append(txt);
}


function consultarProductoIndividual(referenciaProducto){
    for (let i = 0; i < productosGlobal.length; i++) {
        if(productosGlobal[i].referenciaProducto===referenciaProducto){
            return productosGlobal[i];
        }
    }
    return null;
}

/**
 * Función que calcula el valor total de una orden de venta nueva
 */
function calcularPrecioTotal(){
    let fieldProductoEnOrden=$(".productoEnOrden");
    let suma=0;
    for (let i = 0; i < fieldProductoEnOrden.length; i++) {
        let campo=fieldProductoEnOrden[i];
        let hijos=$(campo).children();
        let txtPrecio=$(hijos[2]).children();
        suma+=parseFloat($(txtPrecio).val());
    }
    $("#precio").val(suma);
}


$("#volverALaOrden").click(function(){
    $('#mod').modal('show');
});
/**
 * 
 * @param {*} ordenNueva 
 */
function crearOrden(ordenNueva){
    $.ajax({
        url: url+'/orden',
        type: 'POST',
        headers:{
            token:getCookie("token")
        },
        data: JSON.stringify(ordenNueva),
        dataType:"json",
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            alert(e.mensaje);
            window.location.assign("ventas.html");
        },
        error: function(e){
            console.log(e)
        }
    })
}

$('#agregarOrdenNueva').click(function(e){
    e.preventDefault();
    let clienteDeOrden = buscarClientePorTelefono($("#txtTelefono").val());
    let ordenN={
        motivo_ID: $('#txtMotivo').val(),
        origen_ID: $('#txtOrigen').val(),
        modalidad_pago_ID: $('#txtModalidadPago').val(),
        metodo_compra_ID: $('#txtMetodoCompra').val(),
        direccion_ID: clienteDeOrden.direccion_ID,
        cliente_ID: clienteDeOrden.cliente_ID,
        usuario_ID: usuarioEnSesion.usuario_ID,
        estado: 'Vendido',
        nota: $('#txtNotas').val(),
        fecha_entrega: $("#start").val(),
        tipo_venta: $("#radioMayor").prop("checked"),
        /*descuento: '',*/
        precio: $('#precio').val(),
        productos: obtenerProductoEnOrden()
    }
    crearOrden(ordenN);
});

function buscarClientePorTelefono(telefono){
    let cliente;
    for (let i = 0; i < clientesGlobal.length; i++) {
        if(clientesGlobal[i].telefono===telefono){
            cliente=clientesGlobal[i];
            break;
        }
    }
    return cliente;
}


function obtenerDepartamentosYCiudades(){
    $.ajax({
        url: url+'/departamento',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            if (e.tipo==="OK"){
                departamentosGlobal=e.departamentos;
                llenarDepartamentos(e.departamentos);
            }
            else{
                alert(e.mensaje);
            }
        },
        error: function(e){
            console.log(e)
        },
        complete: function(e){
            clearConsole();
        }
    })
    $.ajax({
        url: url+'/ciudad',
        type: 'GET',
        dataType:"json",
        headers:{
            token:getCookie('token')
        },
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            if (e.tipo==="OK"){
                ciudadesGlobal=e.ciudades;
            }
            else{
                alert(e.mensaje);
            }
        },
        error: function(e){
            console.log(e)
        },
        complete: function(e){
            clearConsole();
        },
        complete: function(e){
            clearConsole();
        }
    })
}


/**
 * 
 * @param {Array} departamentos 
 */
function llenarDepartamentos(departamentos){
    let txt = '';
    for(let i=0; i<departamentos.length; i++){
        txt+='<div class="item" data-value="'+departamentos[i].departamento_ID+'">'+departamentos[i].departamento+'</div>';
    };
    $('#DepartamentoDropdown').append(txt);
    
}
$('#searchDepartamento').click(function(){
    consultarCiudadesPorDepartamento(parseInt($("#txtDepartamento").val(),10));
});
function consultarCiudadesPorDepartamento(departamento_ID){
    
    let ciudadesAPintar=new Array();
    for (let i = 0; i < ciudadesGlobal.length; i++) {
        if(ciudadesGlobal[i].departamento_ID===departamento_ID){
            ciudadesAPintar.push(ciudadesGlobal[i]);
        }
    }
    llenarCiudades(ciudadesAPintar);
}

/**
 * 
 * @param {Array} ciudades 
 */
function llenarCiudades(ciudades){
    $('#CiudadDropdown').empty();
    let txt = '';
    for(let i=0; i<ciudades.length; i++){
        txt='<div class="item" data-value="'+ciudades[i].ciudad_ID+'">'+ciudades[i].nombre+'</div>';
        $('#CiudadDropdown').append(txt);
    };
    
}

function obtenerProductoEnOrden(){
    let productos=new Array();
    let productosEnOrden=$("#Pedido").children();
    for (let i = 1; i < productosEnOrden.length; i+=2) {
        //obtengo referencia
        let camposProducto=$(productosEnOrden[i]).children();
        let campoReferencia=$(camposProducto[0]).children();
        let valoresCampoReferencia=$(campoReferencia).children();
        let referenciaProducto=$(valoresCampoReferencia[0]).val();

        //Obtengo cantidad
        let camposCantidad=$(camposProducto[1]);
        let valoresCamposCantidad=$(camposCantidad).children();
        let divInternoCantidad=$(valoresCamposCantidad[0]).children();
        let divCantidad=$(divInternoCantidad[1]).children();
        let cantidad=$(divCantidad).val();

        //Obtengo precio
        let campoPrecio=$(camposProducto[2]);
        var precio=($(campoPrecio[0]).children()).val();
        let producto={
            referenciaProducto:referenciaProducto,
            cantidad:cantidad,
            precio:precio
        }
        productos.push(producto);
    }
    return productos;
}