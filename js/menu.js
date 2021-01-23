

function menu(){
    var rolToken;
    while(true){
        if (usuarioToken!==undefined){
            break;
        }
    }
    rolToken = usuarioToken.rol;
    for(let i=0;i<rolToken.permisos.length;i++){
        if (rolToken.permisos[i]==="Orden.ver"){
            $("#VentasItemMenu").hide()
        }
    }
}