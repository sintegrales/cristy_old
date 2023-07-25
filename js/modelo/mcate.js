//mostrar formulario
function mostrar_form(dato){
    switch(dato){
        case 0:
            document.getElementById('form').style.display = 'none';
            document.getElementById('uid').value=``;
            document.getElementById('control').value=`0`;
            document.getElementById('submit').value=`Guardar`;
            document.getElementById('nombre').value ="";
        break;
        case 1:
            document.getElementById('form').style.display = 'block';
        break;
    }
}

//consultar

function consultar(){
    db.collection("categoria")
        .orderBy("nombre", "asc")
        .onSnapshot((querySnapshot) => {
        //.get().then((querySnapshot) => {
            document.getElementById('tbodyu').innerHTML = "";
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                document.getElementById('tbodyu').innerHTML += `
                    <tr>
                        <td>${doc.data().nombre}</td>
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

    localStorage.removeItem('nombre');

    // Add a second document with a generated ID.
    db.collection("categoria").add({
        nombre: nombre
    })
    .then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        Swal.fire({
            title: 'La categoría ha sido guardada',
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
    db.collection("categoria").doc(uid)
        .delete().then(() => {
            //console.log("Document successfully deleted!");
            Swal.fire(
                '¡Eliminada!',
                'La categoria ha sido eliminada',
                'success'
              )
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}


//editar
function editar(){

    var nombre = localStorage.getItem('nombre');
    var uid = localStorage.getItem('euid');

    localStorage.removeItem('nombre');
    localStorage.removeItem('euid');

    var userRef = db.collection("categoria").doc(uid);
			
	return userRef.update({
	    nombre: nombre
	})
	.then(function() {
	    //console.log("Document successfully updated!");
        Swal.fire({
            title: 'La categoría ha sido editada',
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


//buscar
function buscar(dato){
    console.log(dato);
    db.collection("categoria")
        .where("nombre","==",dato)
        .get().then((querySnapshot) => {
            document.getElementById('tbodyu').innerHTML = "";
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                document.getElementById('tbodyu').innerHTML += `
                    <tr>
                        <td>${doc.data().nombre}</td>
                        <td>
                            <span class="fas fa-edit" id="editar" title="Editar" onclick="llenar_form('${doc.id}')"></span> 
                            <span class="fas fa-trash" id="eliminar" title="Eliminar" onclick="preguntar('${doc.id}')"></span>
                        </td>
                    </tr>
                `;
            });
        });
}