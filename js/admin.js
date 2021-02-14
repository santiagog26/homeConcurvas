$(document).ready(
    cargarUsuarios()
)

function cargarUsuarios(){
    $.ajax({
        url: url+'/usuario',
        type: 'GET',
        headers:{
            token:getCookie("token")
        },
        dataType:"json",
        contentType: 'application/json; charset=utf-8', 
        success: function(e){
            if (e.tipo==="OK"){
                console.log(e);
            }else{
                alert(e.mensaje);
                window.location.assign("ventas.html")
            }
        },
        error: function(e){
            console.log(e)
        }
    })
}