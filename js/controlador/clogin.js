sessionStorage.setItem("uid","");
var form = document.querySelector("#form");

form.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    var email = form.querySelector("#email").value;
    //encripto clave
    var cl =  CryptoJS.SHA1(form.querySelector("#clave").value);
    var clave = `${cl}`;

    //console.log(clave);

    buscarusuario(email, clave);

})