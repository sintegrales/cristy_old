document.getElementById('nav').innerHTML = `
    <div class="row">
        <div class="col-lg-2" id="logo">
            <img src="../img/Logo-06.png" width="80%">
        </div>
        <div class="col-lg-10" id="menu">
            <nav class="navbar navbar-expand-sm navbar-ligth bg-light" aria-label="Third navbar example">
                <div class="container-fluid">
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" ia-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarsExample03">
                    <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                      <li class="nav-item" style="cursor:pointer">
                        <a class="nav-link" href="dashboard.html">Dashboard</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="cliente.html">Clientes</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="cate.html">Categorías</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="producto.html">Productos</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="per.html">Personalizados</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="pedido.html">Pedidos</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="usuario.html">Usuarios</a>
                    </li>
                    </ul>
                    <!-- <form role="search">
                      <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                    </form> -->
                    <span class="nav-link" id="salir" onclick="salir()">Cerrar Sesión</span>
                  </div>
                </div>
              </nav>
        </div>
    </div>
`;
