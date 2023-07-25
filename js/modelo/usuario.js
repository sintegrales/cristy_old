//mostrar formulario
function mostrar_form(dato){
    switch(dato){
        case 0:
            document.getElementById('form').style.display = 'none';
            document.getElementById('uid').value=``;
            document.getElementById('control').value=`0`;
            document.getElementById('submit').value=`Guardar`;
            document.getElementById('nombre').value ="";
            document.getElementById('rol').value ="";
            document.getElementById('email').value ="";
            document.getElementById('clave').value ="";
        break;
        case 1:
            document.getElementById('form').style.display = 'block';
        break;
    }
}

//consultar

function consultar(){
    db.collection("usuario")
        .orderBy("nombre", "asc")
        .onSnapshot((querySnapshot) => {
        //.get().then((querySnapshot) => {
            document.getElementById('tbodyu').innerHTML = "";
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                document.getElementById('tbodyu').innerHTML += `
                    <tr>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().email}</td>
                        <td>******</td>
                        <td>${doc.data().rol}</td>
                        <td>
                            <span class="fas fa-edit" id="editar" title="Editar" onclick="llenar_form('${doc.id}')"></span> 
                            <span class="fas fa-trash" id="eliminar" title="Eliminar" onclick="preguntar('${doc.id}')"></span>
                        </td>
                    </tr>
                `;
            });
        });
}

//agregar

function agregar(){
    var nombre = localStorage.getItem('nombre');
    var email = localStorage.getItem('email');
    var rol = localStorage.getItem('rol');
    var clave = localStorage.getItem('clave');

    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('clave');

    // Add a second document with a generated ID.
    db.collection("usuario").add({
        nombre: nombre,
        email: email,
        rol: rol,
        clave: clave
    })
    .then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        Swal.fire({
            title: 'El Usuario ha sido guardado',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

//eliminar
function eliminar(uid){
    db.collection("usuario").doc(uid)
        .delete().then(() => {
            //console.log("Document successfully deleted!");
            Swal.fire(
                '¡Eliminado!',
                'El usuario ha sido eliminado',
                'success'
              )
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}


//editar
function editar(){

    var nombre = localStorage.getItem('nombre');
    var email = localStorage.getItem('email');
    var rol = localStorage.getItem('rol');
    var clave = localStorage.getItem('clave');
    var uid = localStorage.getItem('euid');

    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('clave');
    localStorage.removeItem('euid');

    var userRef = db.collection("usuario").doc(uid);
			
	return userRef.update({
	    nombre: nombre,
	    email: email,
        rol: rol,
        clave: clave
	})
	.then(function() {
	    //console.log("Document successfully updated!");
        Swal.fire({
            title: 'El usuario ha sido guardado',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
	})
	.catch(function(error) {
	    // The document probably doesn't exist.
	    alert("error");
	    console.error("Error updating document: ", error);
	});
}
