var venta = new Array();
var totalact = new Array();

$("#codigo_barras").focus();
//CARGUE DE DATATABLES
$(document).ready( function () {
  $('#table-productos-todos').DataTable({
    "lengthMenu": [10, 50, 100, 200],
    "language":{
    "processing": "Procesando",
    "search": "Buscar:",
    "lengthMenu": "Ver _MENU_ Productos",
    "info": "Mirando _START_ a _END_ de _TOTAL_ Productos",
    "zeroRecords": "No encontraron resultados",
    "paginate": {
      "first":      "Primera",
      "last":       "Ultima",
      "next":       "Siguiente",
      "previous":   "Anterior"
    }
  }
  });
});

$("#abrir-caja").on("click", function() {
  $("#modal-abrircaja").modal("show");
});
$("#cerrar-caja").on("click", function() {
  $("#modal-cerrarcaja").modal("show");
});


$("#codigo_barras").on("change", function() {
  var url1 = baseurl + "clientes/getproductoventa",
  codigo_barras = $("#codigo_barras").val();
  $.ajax({
    url: url1,
    method: "POST",
    data: {
      codigo_barras: codigo_barras
    },
    success: function(data) {
      if(data === "error"){
       
      }
      else {
        data = JSON.parse(data);
       
        $("#codigo").val(data.codigo);
        $("#codigo_barras2").val(data.codigo_barras);
        $("#producto").val(data.nombre);
        $("#precio").val(data.precio);
        $("#cantidad").val(data.stock);
        document.getElementById("tabla-ventas").insertRow(-1).innerHTML = '<tr><td><button class="btn btn-xs btn-danger">X</button></td><td>'+data.nombre+'</td><td>'+data.codigo_barras+'</td><td>1</td><td>$'+parseInt(data.precio).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})+'</td></tr>';
        elementos = new Array();
        elementos = data.codigo_barras;
        venta.push(elementos);
        $("#codigo_barras").val("");
        $("#codigo_barras").focus();
        //FUNCIONALIDAD DEL TOTAL AGREGAR EL TOTAL
        totalact.push(data.precio);
        totalact = totalact.map(Number);
        const reducer = (accumulator, curr) => accumulator + curr;
        total = totalact.reduce(reducer);
        $("#total").val(total);
        $("#total-compra").attr("hidden",true);
        document.getElementById("ventaa").innerHTML = '<small>$ </small> '+ total.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) +'';
      }
    }
  });
})
 $("#recibio").on("keyup", function () {
    var recibio = parseInt($("#recibio").val()),
        total = parseInt($("#total").val());
        $("#devolver").attr("hidden", true);
        document.getElementById("volver").innerHTML = '<h4 class="text-white text-uppercase">'+ (recibio - total).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+'</h4>';
 });

$("#buscar-producto").on("click", function () {
  $("#modal-productos").modal("show");
});

$("#otra-venta").on("click", function () {
  
});

//DARLE ACCION A EL BOTON CONTROL + F1
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.keyCode === 65)
  {
    var url = baseurl + "clientes/crearventa",
    consecutivo = $("#consecutivo").val(),
    documento = $("#documento").val(),
    codigo = $("#codigo").val(),
    ean = $("#codigo_barras2").val(),
    recibio = $("#recibio").val(),
    total = $("#total").val(),
    tp_pago = $("#tp_pago").val(),
    referencia = $("#referencia").val(),
    sede = $("#sede").val();
    let ventas = [];

    for (let i = 0; i < venta.length; i++) {
      ventas [i] = venta[i];
    }

    if(recibio == "") {
      $("#recibio").addClass("is-invalid");
      $("#recibio").focus();
    }
    else {
      $.ajax({
        url: url,
        method: "POST",
        data: {
          consecutivo: consecutivo,
          documento: documento,
          recibio: recibio,
          ventas: ventas,
          total: total,
          tp_pago: tp_pago,
          referencia: referencia,
          sede: sede
        },
        success: function(data) {
          $("body").overhang({
            type: "success",
            message: "La venta se ha creado correctamente"
          });
          facturaVenta(consecutivo);
        },
        error: function () {
          $("body").overhang({
            type: "error",
            message: "Alerta ! Tenemos un problema al conectar con la base de datos verifica tu red.",
          });
        }
      });
    }
  }
});

//DARLE ACCION A EL BOTON CONTROL + F2
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.keyCode === 113)
  {
    location.reload();
  }
});

//DARLE ACCION A EL BOTON CONTROL + F3
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.keyCode === 114)
  {
    $("#modal-productos").modal("show");
  }
});

$("#asociar-producto").on("click", function () {
  var codigo = $("#codigoproduct:checked").val(),
      url3 = baseurl + "clientes/verproducto/" + codigo;
      $.ajax({
        url: url3,
        method: "GET",
        success: function(data) {
          data = JSON.parse(data);
          $("#modal-productos").modal("hide");
          $("#codigo").val(data.codigo);
          $("#codigo_barras2").val(data.codigo_barras);
          $("#producto").val(data.nombre);
          $("#precio").val(data.precio);
          $("#cantidad").val(data.stock);
        document.getElementById("tabla-ventas").insertRow(-1).innerHTML = '<tr><td><button class="btn btn-xs btn-danger">X</button></td><td>'+data.nombre+'</td><td>'+data.codigo_barras+'</td><td>1</td><td>$'+parseInt(data.precio).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})+'</td></tr>';
        venta.push(data.codigo_producto);
        $("#codigo_barras").val("");
        $("#codigo_barras").focus();
        //FUNCIONALIDAD DEL TOTAL AGREGAR EL TOTAL
        totalact.push(data.precio);
        totalact = totalact.map(Number);
        const reducer = (accumulator, curr) => accumulator + curr;
        total = totalact.reduce(reducer);
        $("#total").val(total);
        $("#total-compra").attr("hidden",true);
        document.getElementById("ventaa").innerHTML = '<small>$ </small> '+ total.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) +'';
        }
      });
});

$("#tp_pago").on("change", function () {
  var tp_pago = $("#tp_pago").val();
  if(tp_pago == "NEQUI"){
    $("#referencia-hid").attr("hidden", false);
  }
  else if(tp_pago == "BANCOLOMB") {
    $("#referencia-hid").attr("hidden", false);
  }
  else if(tp_pago == "EFECTIVO") {
    $("#referencia-hid").attr("hidden", true);
    $("#referencia").val("");
  }
});


function facturaVenta(consecutivo) {
  url = baseurl  + "clientes/generarpdfventas/" + consecutivo;
  window.open(url, "_blank", " width=500, height=400");
}

function reloadPage() {
  location.reload();
}



