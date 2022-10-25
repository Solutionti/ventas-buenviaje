<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buen viaje - Ventas</title>
    <?php require_once("componentes/head.php"); ?>
</head>
<body class="g-sidenav-show bg-gray-100">
  <div
    class="position-absolute w-100 min-height-300 top-0"
    style="background-image: url('https://cdn.pixabay.com/photo/2020/10/01/17/11/store-5619201_960_720.jpg'); background-position-y: 50%; background-repeat: no-repeat; background-size: 100%"
  >
    <span class="mask bg-default opacity-6"></span>
  </div>
  <div class="main-content position-relative max-height-vh-100 h-100">
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="<?php echo base_url(); ?>clientes/inicio">Buen Viaje</a></li>
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Ventas</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Ventas</h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            <div class="input-group">
            </div>
          </div>
          <ul class="navbar-nav  justify-content-end">
            <li class="nav-item d-flex align-items-center">
              <a href="<?php echo base_url(); ?>cerrarsesionclientes" class="nav-link text-white font-weight-bold px-0">
                <i class="fa fa-user me-sm-1"></i>
                <span class="d-sm-inline d-none">Cerrar Sesión</span>
              </a>
            </li>
            <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0 h6 text-uppercase">Sistema de Ventas</p>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-9">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Codigo de barras</label>
                        <input
                          type="text"
                          class="form-control form-control-md"
                          id="codigo_barras"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Codigo</label>
                        <input
                          type="text"
                          class="form-control"
                          id="codigo"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Codigo EAN</label>
                        <input
                          type="text"
                          class="form-control form-control-md"
                          id="codigo_barras2"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Usuario vendedor</label>
                        <input
                          type="text"
                          class="form-control form-control-md"
                          value="<?php echo $this->session->userdata("nombre")." ".$this->session->userdata("apellido"); ?>"
                          readonly
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-5">
                      <div class="form-group">
                        <label>Nombre del producto</label>
                        <input
                          type="text"
                          class="form-control"
                          id="producto"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Precio</label>
                        <div class="input-group">
                          <span class="input-group-text">$</span>
                          <input
                            type="text"
                            class="form-control"
                            id="precio" aria-label="Amount (to the nearest dollar)"
                            readonly
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Cantidad</label>
                        <input
                          type="number"
                          class="form-control"
                          min="0"
                          max="50"
                          id="cantidad"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="col-md-1">
                      <br>
                      <button class="btn btn-icon btn-2 text-white color-cyan mt-1" type="button" id="buscar-producto">
	                      <span class="fas fa-search"><i class="ni ni-bulb-61"></i></span>
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Recibo de efectivo</label>
                      <input
                        type="text"
                        class="form-control"
                        id="recibio"
                      >
                    </div>
                    <div class="col-md-6">
                      <label>Total</label>
                      <input
                        type="text"
                        class="form-control"
                        id="total"
                        readonly
                      >
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="table-responsive">
                      <table class="table table-stripped table-hover">
                        <thead class="bg-default ">
                          <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12"></th>
                          <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Producto</th>
                          <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Codigo</th>
                          <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Cantidad</th>
                          <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Total</th>
                        </thead>
                        <tbody id="tabla-ventas">
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 mb-4">
                  <div class="card card-pricing">
                    <div
                      class="card-header bg-gradient-success text-center pt-4 pb-5 position-relative"
                    >
                      <div class="z-index-1 position-relative">
                        <h5 class="text-white">Total Compra</h5>
                        <h1 class="text-white mt-2 mb-0" id="ventaa">
                        <small id="total-compra">$ </small>0
                        </h1>
                        <h6 class="text-white">Total a devolver</h6>
                        <div id="volver">
                          <h4 class="text-white" id="devolver">0</h4>
                        </div>
                      </div>
                    </div>
                  <div class="position-relative mt-n5" style="height: 50px;">
                  <div class="position-absolute w-100">
                    <svg class="waves waves-sm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
                  <defs>
                    <path id="card-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                  </defs>
                  <g class="moving-waves">
                    <use xlink:href="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30"></use>
                    <use xlink:href="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)"></use>
                    <use xlink:href="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)"></use>
                    <use xlink:href="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)"></use>
                    <use xlink:href="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)"></use>
                    <use xlink:href="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)"></use>
                  </g>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Documento</label>
                    <input type="text" class="form-control form-control-sm" value="FACTURA" id="documento" readonly>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Tipo pago</label>
                    <select
                      class="form-control form-control-sm"
                      id="tp_pago"
                    >
                    <option value="EFECTIVO">EFECTIVO</option>
                    <option value="NEQUI">NEQUI</option>
                    <option value="BANCOLOMB">BANCOLOMBIA</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row" id="referencia-hid" hidden>
                <div class="col-md-12">
                  <div class="form-group">
                    <input type="text" id="referencia" class="form-control form-control-sm" placeholder="Referencia de pago">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Sede</label>
                    <input type="text" class="form-control form-control-sm" value="Sede terminal" id="sede" readonly>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>N° de venta</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      value="<?php echo "VNT00" . ($consecutivo->consecutivo + 1); ?>"
                      id="consecutivo"
                      readonly
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Impuesto</label>
                    <select class="form-control form-control-sm">
                      <option value="">A</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">D</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Fecha</label>
                    <input type="text" class="form-control form-control-sm" value="<?php echo date("d-m-Y"); ?>" readonly>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                  <div class="col-md-12">
                    <div class="form-group">
                    <button class="btn bg-gradient-success" id="abrir-caja">Abrir caja</button>
                    <button class="btn bg-gradient-danger" id="cerrar-caja">Cerrar Caja</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  </div>
  <?php require_once("componentes/footer.php"); ?>
</div>
<!-- VENTANA MODAL PARA LOS PRODUCTOS  -->
<div
  class="modal fade"
  id="modal-productos"
  data-backdrop="static"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <h5 class="modal-title text-uppercase text-white" id="exampleModalLabel">Listado de Productos</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-hover table-borderless table-stripped"  id="table-productos-todos">
              <thead class="bg-default ">
                <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Imagen</th>
                <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Codigo</th>
                <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Nombre</th>
                <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Precio</th>
                <th class="text-uppercase text-white text-xs font-weight-bolder opacity-12">Cantidad</th>
                <th></th>
              </thead>
              <tbody>
                <?php foreach($producto->result() as $productos) { ?>
                <tr>
                  <td>
                    <div class="text-center">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/007/481/440/non_2x/red-shopping-basket-with-products-icon-isolated-on-background-with-green-leaves-plastic-shop-cart-with-vegetables-fruit-water-healthy-food-illustration-organic-natural-concept-vector.jpg"
                        class="avatar avatar-sm me-4"
                      >
                    </div>
                  </td>
                  <td class="text-xs text-dark mb-0"><?php echo $productos->codigo; ?></td>
                  <td class="text-xs text-dark mb-0"><?php echo $productos->nombre; ?></td>
                  <td class="text-xs text-dark mb-0">$<?php echo $productos->precio; ?></td>
                  <td class="text-xs text-dark mb-0"><?php echo $productos->stock; ?></td>
                  <td>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="codigoproduct" id="codigoproduct" value="<?php echo $productos->codigo; ?>">
                      <label class="form-check-label" for="codigoproduct"></label>
                    </div>
                    </td>
                </tr>
                <?php } ?>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn color-cyan text-white" id="asociar-producto">Vender</button>
        </div>
      </div>
    </div>
  </div>

  <!-- VENTANA MODAL PARA APERTURA DE LA CAJA -->
  <div
  class="modal fade"
  id="modal-abrircaja"
  data-backdrop="static"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <h5 class="modal-title text-uppercase text-white" id="exampleModalLabel">Apertura de caja</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Fecha</label>
                <input type="date" class="form-control form-control-sm" value="<?php echo date("Y-m-d")?>">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Tipo de movimiento</label>
                <input type="text" class="form-control form-control-sm" value="APERTURA">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Monto</label>
                <input type="number" class="form-control form-control-sm">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Comentarios</label>
                <textarea class="form-control" rows="5"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn color-cyan text-white" id="abrir">Aceptar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- CIERRE DE CAJA -->
  <div
  class="modal fade"
  id="modal-cerrarcaja"
  data-backdrop="static"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <h5 class="modal-title text-uppercase text-white" id="exampleModalLabel">Cierre de caja</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <?php $balances = $balance->result()[0]; ?>
          <h5>¿Esta seguro de cerrar caja?</h5>
          <small>Se recomienda revisar sus montos de cierre</small>
          <h6 class="text-uppercase mt-3">Balance teorico: $/ <?php echo $balances->venta; ?></h6>
          <h6 class="text-uppercase">Efectivo real: $/ 50.000</h6>
          <h6 class="text-uppercase">Diferencia: $/ 0</h6>
          <br>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Total efectivo">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success text-white" id="abrir">Aceptar</button>
          <button type="button" class="btn btn-danger text-white" id="cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <?php require_once("componentes/scripts.php"); ?>
  <script>
    var baseurl = "<?php echo base_url();?>";
  </script>
  <script src="<?php echo base_url(); ?>public/js/scripts/ventas.js"></script>
</body>
</html>