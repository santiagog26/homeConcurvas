$(document).ready(menu());

function menu(){
    var rolToken;
    while(true){
        if (usuarioToken!==undefined){
            break;
        }
    }

    rolToken = usuarioToken.rol;
    let permisosUsuario=usuarioToken.permisos;
    let permisosRol=rolToken.permisos;
    if(!tienePermiso("Orden.ver",permisosUsuario) && !tienePermiso("Orden.ver",permisosRol)){
        $("#VentasItemMenu").hide();
    }
    if(!tienePermiso("Inventario.ver",permisosUsuario) && !tienePermiso("Inventario.ver",permisosRol)){
        $("#InventarioItemMenu").hide();
    }
    if(!tienePermiso("Empaque.ver",permisosUsuario) && !tienePermiso("Empaque.ver",permisosRol)){
        $("#EmpaqueItemMenu").hide();
    }
    if(!tienePermiso("Despacho.ver",permisosUsuario) && !tienePermiso("Despacho.ver",permisosRol)){
        $("#DespachoItemMenu").hide();
    }
    if(!tienePermiso("Distribucion.ver",permisosUsuario) && !tienePermiso("Distribucion.ver",permisosRol)){
        $("#DistribucionItemMenu").hide();
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