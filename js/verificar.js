$(document).ready(function(){
    let token=getCookie("token")
    if (token===""){
        window.location.assign("index.html");
    }else{
        validarUsuario(token);
    }
});