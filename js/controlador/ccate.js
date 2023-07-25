// consultar
consultar();


//agregar usuario

var form = document.querySelector("#form");

form.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    var control = form.querySelector("#control").value;

    localStorage.setItem("nombre", form.querySelector("#nombre").value);
    localStorage.setItem("euid", form.querySelector("#uid").value);
    //console.log(clave);

    mostrar_form(0);

    switch(control){
        case '0':
            agregar();
        break;
        case '1':
            editar();
        break;
    }
    

})

//preguntar antes de eliminar
function preguntar(uid){

    var docRef = db.collection("categoria").doc(uid);

    var getOptions = {
        source: 'cache'
    };

    docRef.get(getOptions).then((doc) => {
        //console.log("Cached document data:", doc.data());
        Swal.fire({
            title: '¿Esta usted seguro de eliminar la categoría ' + doc.data().nombre + '?',
            text: "¡No podra revertir el proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
              eliminar(uid);
            }
          })
    }).catch((error) => {
        console.log("Error getting cached document:", error);
    });

    
}

//llenar formularioparalka edición
function llenar_form(uid){
    var docRef = db.collection("categoria").doc(uid);

    var getOptions = {
        source: 'cache'
    };

    docRef.get(getOptions).then((doc) => {
        //console.log("Cached document data:", doc.data());
        document.getElementById('uid').value=`${doc.id}`;
        document.getElementById('control').value=`1`;
        document.getElementById('nombre').value=`${doc.data().nombre}`;
        document.getElementById('submit').value=`Editar`;
        mostrar_form(1);
    }).catch((error) => {
        console.log("Error getting cached document:", error);
    });
}

function filtro(){
    var dato = document.getElementById('buscar').value;
    //console.log(dato);
    buscar(dato);
}