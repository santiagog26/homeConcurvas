$(document).ready(function(){
    if (getCookie("token")!==""){
        window.location.assign("ventas.html");
    }
})
$("#login").click(function(e){
    e.preventDefault()
    let usuario=$("#user").val();
    let contraseña=$("#password").val();
    let obj={usuario:usuario,contraseña:contraseña};
    login(obj);
})


function login(obj){
    $.ajax({
        url: url+'/login',
        type: 'POST',
        dataType:"json",
        data: JSON.stringify(obj),
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            console.log(e);
            if (e.tipo==="OK"){
                setCookie("token",e.usuario.token,10);
                window.location.assign("ventas.html");
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