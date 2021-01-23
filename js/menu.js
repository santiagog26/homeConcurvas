var rolToken;

function menu(){
    while(true){
        if (usuarioToken!==undefined){
            rolToken = usuarioToken.rol;
            break;
        }
    }
    for(var i=0;i<rolToken.permisos.length;i++){
        if (rolToken.permisos[i]==="Orden.ver"){
            $("#VentasItemMenu").hide()
        }
    }
}