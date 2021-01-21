$(document).ready(function(){
    let token=getCookie("token")
    if (token==""){
        window.location.assign("login.html");
    }else{
        validarUsuario(token);
    }
});