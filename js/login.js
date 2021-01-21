var url="http://184.72.83.24:5000";

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
            setCookie("token",e.usuario.token,10);
        },
        error: function(e){
            console.log(e)
        }
    })
}