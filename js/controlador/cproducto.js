// consultar
consultar();
con_cate();

//agregar usuario

var form = document.querySelector("#form");

form.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    var control = form.querySelector("#control").value;

    localStorage.setItem("codigo", form.querySelector("#codigo").value);
    localStorage.setItem("nombre", form.querySelector("#nombre").value);
    localStorage.setItem("marca", form.querySelector("#marca").value);
    localStorage.setItem("precio", form.querySelector("#precio").value);
    localStorage.setItem("categoria", form.querySelector("#cate").value);
    localStorage.setItem("descripcion", form.querySelector("#descripcion").value);
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

    var docRef = db.collection("producto").doc(uid);

    var getOptions = {
        source: 'cache'
    };

    docRef.get(getOptions).then((doc) => {
        //console.log("Cached document data:", doc.data());
        Swal.fire({
            title: '¿Esta usted seguro de eliminar el producto ' + doc.data().nombre + '?',
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
    var docRef = db.collection("usuario").doc(uid);

    var getOptions = {
        source: 'cache'
    };

    docRef.get(getOptions).then((doc) => {
        //console.log("Cached document data:", doc.data());
        document.getElementById('uid').value=`${doc.id}`;
        document.getElementById('control').value=`1`;
        document.getElementById('nombre').value=`${doc.data().nombre}`;
        document.getElementById('email').value=`${doc.data().email}`;
        document.getElementById('rol').value=`${doc.data().rol}`;
        document.getElementById('clave').value=`${doc.data().clave}`;
        document.getElementById('submit').value=`Editar`;
        mostrar_form(1);
    }).catch((error) => {
        console.log("Error getting cached document:", error);
    });
}


//subir imagen------------------------------------
var pid;
function asignarid(id){
    this.pid = id;
    console.clear();
    console.log(pid);
}

//capturar el archivo imagen
var form2 = document.querySelector("#subir");
form2.addEventListener("submit", (ev)=>{
    ev.preventDefault();
    var arch = form2.querySelector("#archivo");
    console.log(arch.files);
    var archivo = arch.files[0];
    publicar({file: archivo});
})


//subir el archivo
const subir = async({file})=>{
    //referencia al archivo
    var storageRef = firebase.storage().ref().child(`productos/${pid}/${file.name}`);
    //subir archivo
    await storageRef.put(file);
    //retornar referencia
    return storageRef;
}

