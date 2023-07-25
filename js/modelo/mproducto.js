//mostrar formulario
function mostrar_form(dato){
    switch(dato){
        case 0:
            document.getElementById('form').style.display = 'none';
            document.getElementById('uid').value=``;
            document.getElementById('control').value=`0`;
            document.getElementById('submit').value=`Guardar`;
            document.getElementById('codigo').value ="";
            document.getElementById('nombre').value ="";
            document.getElementById('marca').value ="";
            document.getElementById('precio').value ="";
            document.getElementById('cate').value ="";
            document.getElementById('descripcion').value ="";
        break;
        case 1:
            document.getElementById('form').style.display = 'block';
        break;
    }
}

//consultar

function consultar(){
    db.collection("producto")
        .orderBy("nombre", "asc")
        .onSnapshot((querySnapshot) => {
        //.get().then((querySnapshot) => {
            document.getElementById('tbodyu').innerHTML = "";
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                var valor = Number(doc.data().precio);
                
                var precio = moneda("USD",valor);

                console.log(precio);
                document.getElementById('tbodyu').innerHTML += `
                    <tr>
                        <td>${doc.data().codigo}</td>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().marca}</td>
                        <td>${precio}</td>
                        <td>${doc.data().categoria}</td>
                        <td>${doc.data().descripcion}</td>
                        <td class="text-center">
                            <button type="button" class="btn btn-primary fas fa-eye" title="Ver Imágenes" onclick="verg('${doc.id}')" data-bs-toggle="modal" data-bs-target="#gal"></button>
                            <button type="button" title="Subir imagen" class="btn btn-secondary fas fa-upload" onclick="asignarid('${doc.id}')"  data-bs-toggle="modal" data-bs-target="#subirimg"></button>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-info fas fa-edit" id="editar" title="Editar" onclick="llenar_form('${doc.id}')">&nbsp;</span> 
                            <button class="btn btn-danger fas fa-trash" id="eliminar" title="Eliminar" onclick="preguntar('${doc.id}')">&nbsp;</span>
                        </td>
                    </tr>
                `;
            });
        });
}

//agregar

function agregar(){
    var codigo = localStorage.getItem('codigo');
    var nombre = localStorage.getItem('nombre');
    var marca = localStorage.getItem('marca');
    var precio = Number(localStorage.getItem('precio'));
    var categoria = localStorage.getItem('categoria');
    var descripcion = localStorage.getItem('descripcion');
    var imagenes = [];

    localStorage.clear();

    // Add a second document with a generated ID.
    db.collection("producto").add({
        codigo: codigo,
        nombre: nombre,
        marca: marca,
        precio: precio,
        categoria: categoria,
        descripcion: descripcion,
        imagenes: imagenes
    })
    .then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        Swal.fire({
            title: 'El producto ha sido guardado',
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
    db.collection("producto").doc(uid)
        .delete().then(() => {
            //console.log("Document successfully deleted!");
            Swal.fire(
                '¡Eliminado!',
                'El producto ha sido eliminado',
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


//moneda
function moneda(currency,value) {
    var formato = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency
      }) 
    return formato.format(value)
  }

  //consultar categorias
  function con_cate(){
    db.collection("categoria")
        .orderBy("nombre", "asc")
        .onSnapshot((querySnapshot) => {
        //.get().then((querySnapshot) => {
            document.getElementById('cate').innerHTML = '<option value="" label="Seleccione rol">Seleccione categoría</option>';
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                document.getElementById('cate').innerHTML += `
                    <option value="${doc.data().nombre}" label="${doc.data().nombre}">${doc.data().nombre}</option>
                `;
            });
        });
}


//publicar imagen

const publicar = async({file})=>{
    var ref = await subir({file});
    var dato = ref.fullPath;
    console.log(dato);
    verificardoc_img(`${dato}`);

    /*document.getElementById('mostrar').innerHTML = `
        <p>Nombre: ${dato}</p> 
    `;
    var url = await firebase.storage().ref(dato).getDownloadURL();
    console.log(url);
    document.getElementById('mostrar').innerHTML += `
        <img src="${url}" alt="imagen" width="200"> 
    `;*/
}


function verificardoc_img(ruta){
    ///consulto producto
    var docRef = db.collection("producto").doc(this.pid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            var imagenes = doc.data().imagenes;
            imagenes.push(ruta);
            console.log(imagenes);
            guardarimg(pid, imagenes);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function guardarimg(pid, imgs){
    var proRef = db.collection("producto").doc(pid);
			
	return proRef.update({
	    imagenes: imgs
	})
	.then(function() {
	    //console.log("Document successfully updated!");
        Swal.fire({
            title: 'La imagen ha sido guardada',
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
    //agrego imagen
    /**/

function verg(pid){
    ///consulto producto
    var docRef = db.collection("producto").doc(pid);

    docRef.get().then(async (doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            var imagenes = doc.data().imagenes;
            var largo = imagenes.length;
            var men = "";
            var url = "";
            for(con=0; con<largo; con++){
                url = await firebase.storage().ref(imagenes[con]).getDownloadURL();
                console.log(url);
                men += `<div style="width:20%; float: left;" >
                            <a href="${url}" data-bs-dismiss="modal">
                                <img src="${url}" width="100%">
                            </a>
                        </div>`;
                //console.log(men);
            }
            men += `<div style="clear: both;"></div>`
            document.getElementById('galeria').innerHTML = men;
            //var url = await firebase.storage().ref(imagenes[0]).getDownloadURL();
            //console.log(url);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

