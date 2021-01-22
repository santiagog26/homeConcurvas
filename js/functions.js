var url="http://184.72.83.24:5000";
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
        },
        error: function(e){
            console.log(e)
        }
    })
}

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