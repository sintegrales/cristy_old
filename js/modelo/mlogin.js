function buscarusuario(email, clave){
        
    
        db.collection("usuario")
            .where("email", "==", email)
            .where("clave", "==", clave)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    sessionStorage.setItem("uid", doc.id);
                    document.location.href = "dashboard.html";
                });
        });
    }

var user;

function bloqueo(){
    var uid = sessionStorage.getItem("uid");
    //console.log(uid);
    switch(true){
        case uid == "":
            document.location.href = "index.html";
        break;
        default:
            var docRef = db.collection("usuario").doc(uid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
                    this.user = doc.data();
                    //console.log(this.user);
                } else {
                    sessionStorage.clear();
                    document.location.href="index.html";
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }
}

function salir(){
    sessionStorage.clear();
    document.location.href="index.html";
}
