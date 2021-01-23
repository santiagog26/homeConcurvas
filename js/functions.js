var url="http://184.72.83.24:5000";

/**
 * 
 * @param {*} token 
 */
function validarUsuario(token){
    $.ajax({
        url: url+'/validar',
        type: 'POST',
        headers:{
            token:token
        },
        dataType:"json",
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            if (!e.value){
                delete_cookie("token");
                window.location.assign("index.html");
            }
            menu(e.usuario);
        },
        error: function(e){
            console.log(e)
        }
    })
}
/**
 * 
 * @param {*} cname 
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
/**
 * Función que establece una cookie
 * @param {*} cname 
 * @param {*} cvalue 
 * @param {*} exdays 
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Función que elimina una cookie por el nombre
 * @param {*} name 
 */
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
/**
 * Función que elimina todas las cookies 
 */
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/**
 * 
 * @param {usuario} usuarioToken 
 */
function menu(usuarioToken){
    var rolToken;

    rolToken = usuarioToken.rol;
    let permisosUsuario=usuarioToken.permisos;
    let permisosRol=rolToken.permisos;
    let divMenu=$("#divMenuF2")[0].children()[0];
    if(!tienePermiso("Orden.ver",permisosUsuario) && !tienePermiso("Orden.ver",permisosRol)){
        $(divMenu).append('<a href="ventas.html" id="VentasItemMenu" class="item">Ventas</a>');
    }
    if(!tienePermiso("Estadisticas.ver",permisosUsuario) && !tienePermiso("Estadisticas.ver",permisosRol)){
        divMenu.append('<a href="estadisticas.html" id="EstadisticasItemMenu" class="item">Estadísticas</a>');
    }
    if(!tienePermiso("Inventario.ver",permisosUsuario) && !tienePermiso("Inventario.ver",permisosRol)){
        divMenu.append('<a href="inventario.html" id="InventarioItemMenu" class="item">Inventario</a>');
    }
    if(!tienePermiso("Empaque.ver",permisosUsuario) && !tienePermiso("Empaque.ver",permisosRol)){
        divMenu.append('<a href="empaque.html" id="EmpaqueItemMenu" class="item">Empaque</a>');
    }
    if(!tienePermiso("Despacho.ver",permisosUsuario) && !tienePermiso("Despacho.ver",permisosRol)){
        divMenu.append('<a href="despacho.html" id="DespachoItemMenu" class="item">Despacho</a>')
    }
    if(!tienePermiso("Distribucion.ver",permisosUsuario) && !tienePermiso("Distribucion.ver",permisosRol)){
        divMenu.append('<a href="distribucion.html" id="DistribucionItemMenu" class="item">Distribución</a>')
    }
    if(!tienePermiso("Pagodomiciliario.ver",permisosUsuario) && !tienePermiso("Pagodomiciliario.ver",permisosRol)){
        divMenu.append('<a hfef="finanzas.html" id="FinanzasItemMenu" class="item">Finanzas</a>`')
    }
}


function tienePermiso(permiso,listaPermisos){
    for (let i = 0; i < listaPermisos.length; i++) {
        if(permiso===listaPermisos[i].nombre){
            return true;
        }  
    }
    return false;
}




$("#logout").click(function(){
    delete_cookie("token");
    window.location.assign("index.html");
});