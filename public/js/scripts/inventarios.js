//DATA TABLE DE PRODUCTOS 
$(document).ready( function () {
    $('#tabla-productos').DataTable({
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
  $(document).ready( function () {
    $('#table-inventario').DataTable({
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


$("#codigo_barras_p").on("keyup", function () {
    var inputcodigo = $("#codigo_barras_p").val();

    $("#codigo_p").val(inputcodigo);
})

$("#codigo_p").on("keyup", function () {
    var inputcodigo = $("#codigo_p").val();

    $("#codigo_barras_p").val(inputcodigo);
})

$("#guardar_productos").on("click", function() {
    var formdata = new FormData();
    var url1 = baseurl + "clientes/crearproductos",
    categoria_p = $("#categoria_p").val(),
    nombre_p = $("#nombre_p").val(),
    codigo_p = $("#codigo_p").val(),
    codigo_barras_p = $("#codigo_barras_p").val(),
    medida_p = $("#medida_p").val(),
    cantidad_p = $("#cantidad_p").val(),
    precio_p = $("#precio_p").val(),
    precio_proveedor = $("#precio_proveedor").val(),
    moneda_p = $("#moneda_p").val(),
    descripcion_p = $("#descripcion_p").val(),
    pro_venta = $("#pro_venta:checked").length;
    formdata.append("categoria", categoria_p);
    formdata.append("nombre", nombre_p);
    formdata.append("codigo", codigo_p);
    formdata.append("codigo_barras", codigo_barras_p);
    formdata.append("medida", medida_p);
    formdata.append("cantidad", cantidad_p);
    formdata.append("precio", precio_p);
    formdata.append("precio_proveedor", precio_proveedor);
    formdata.append("moneda", moneda_p);
    formdata.append("descripcion", descripcion_p);
    formdata.append("pro_venta", pro_venta);
    if(categoria_p == "") {
      $("#categoria_p").addClass("is-invalid");
    }
    else if (nombre_p == "") {
      $("#categoria_p").removeClass("is-invalid");
      $("#nombre_p").addClass("is-invalid");
    }
    else if(codigo_p == "") {
      $("#nombre_p").removeClass("is-invalid");
      $("#codigo_p").addClass("is-invalid");
    }
    else if(codigo_barras_p == "") {
      $("#codigo_p").removeClass("is-invalid");
      $("#codigo_barras_p").addClass("is-invalid");
    }
    else if(precio_p == "") {
      $("#codigo_barras_p").removeClass("is-invalid");
      $("#codigo_p").removeClass("is-invalid");
      $("#precio_p").addClass("is-invalid");
    }
    else {
        $.ajax({
            url: url1,
            method: "POST",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (data) {
              if(data === "error") {
                $("body").overhang({
                  type: "error",
                  message: "Alerta ! el producto ya existe en la base de datos.",
                });
              }
              else {
                $("body").overhang({
                  type: "success",
                  message: "El producto se  ha creado correctamente"
                });
                setTimeout(reloadPage, 2000);
              }
            },
            error: function () {
            }
        });
    }
});

$("#actualizar_productos").on("click", function () {
  var url = baseurl + "clientes/actualizarproductos",
      id_productos = $("#id_productos_act").val(),
      categoria = $("#categoria_p_act").val(),
      nombre = $("#nombre_p_act").val(),
      codigo = $("#codigo_p_act").val(),
      codigo_barras = $("#codigo_barras_p_act").val(),
      precio_venta = $("#precio_p_act").val(),
      precio_proveedor = $("#precio_proveedor_act").val(),
      producto_venta = $("#pro_venta_act").val(),
      descripcion = $("#descripcion_p_act").val();

      $.ajax({
        url : url,
        method: "POST",
        data: {
          id_productos: id_productos,
          categoria: categoria,
          nombre: nombre,
          codigo: codigo,
          codigo_barras: codigo_barras,
          precio: precio_venta,
          precio_proveedor: precio_proveedor,
          pro_venta: producto_venta,
          descripcion: descripcion
        },
        success: function () {
          $("body").overhang({
            type: "success",
            message: "El producto se  ha actualizado correctamente"
          });
          setTimeout(reloadPage, 3000);
        },
        error:  function () {
          $("body").overhang({
            type: "error",
            message: "Alerta ! Tenemos un problema al conectar con la base de datos verifica tu red.",
          });
        }
      });
});

function verProductos(codigo) {
  var url = baseurl + "clientes/verproducto/" + codigo;
  $("#actualizarproductos").modal("show");

  $.ajax({
    url: url,
    method: "GET",
    success: function (data) {
      data = JSON.parse(data);
      console.log(data);
      $("#id_productos_act").val(data.codigo_producto);
      $("#categoria_p_act").val(data.categoria).attr("selected", true);
      $("#nombre_p_act").val(data.nombre);
      $("#codigo_p_act").val(data.codigo);
      $("#codigo_barras_p_act").val(data.codigo_barras);
      $("#precio_p_act").val(data.precio);
      $("#precio_proveedor_act").val(data.costo_proveedor);
      $("#descripcion_p_act").val(data.descripcion);
    }
  });

}

$("#opciones-inventario").on("change", function () {

    var opciones = $("#opciones-inventario").val();

    if(opciones == 1) {
        $(".movimientos-kardex").attr("hidden", false);
        $(".consulta-inventario").attr("hidden", true);
    }
    else if (opciones == 2) {
        $(".movimientos-kardex").attr("hidden", true);
        $(".consulta-inventario").attr("hidden", false);
    }
    else {
        $(".movimientos-kardex").attr("hidden", true);
        $(".consulta-inventario").attr("hidden", true);
    }
});

//ENTRADA DE INVENTARIO
$("#producto_e").on("change", function() {
    var id = $("#producto_e").val(),
    url = baseurl + "clientes/traerstock/" + id;

    $.ajax({
        url: url,
        method: "GET",
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            $("#stock_e").val(data.stock);
            //$("#cantidad_e").val(data.cantidad);
            $("#precioproducto_e").val(data.precio);
            $("#nombreproducto_e").val(data.nombre);
            $("#valorcompra_e").val(data.costo_proveedor);
            


        }
    })
})

$("#guardar_e").on("click", function () {
  var url = baseurl + "clientes/crearentrada",
  cantidad = $("#cantidad_e").val(),
  stock = $("#stock_e").val(),
  total = parseInt(cantidad) + parseInt(stock),
  producto = $("#producto_e").val(),
  seccion = $("#seccion_e").val(),
  motivo = $("#motivo_e").val(),
  comentarios = $("#comentarios_e").val();
  if(producto == "") {
    $("#producto_e").addClass("is-invalid");
  }
  else if(cantidad == "") {
    $("#producto_e").removeClass("is-invalid");
    $("#cantidad_e").addClass("is-invalid");
  }
  else if(motivo == "") {
    $("#cantidad_e").removeClass("is-invalid");
    $("#motivo_e").addClass("is-invalid");
  }
  else if(comentarios == "") {
    $("#motivo_e").removeClass("is-invalid");
    $("#comentarios_e").addClass("is-invalid");
  }
  else {
      $.ajax({
        url: url,
        method: "POST",
        data: {
          cantidad: cantidad,
          total: total,
          producto: producto,
          seccion: seccion,
          motivo: motivo,
          comentarios: comentarios
        },
        success: function () {
          $("body").overhang({
            type: "success",
            message: "se ha agregado entrada correctamente"
          });
          setTimeout(reloadPage, 3000);
        },
        error: function () {
          $("body").overhang({
            type: "error",
            message: "Alerta ! Tenemos un problema al conectar con la base de datos verifica tu red.",
          });
        }
      });
  }
})
//SALIDA DE INVENTARIO
$("#producto_s").on("change", function() {
    var id = $("#producto_s").val(),
    url = baseurl + "clientes/traerstock/" + id;

    $.ajax({
        url: url,
        method: "GET",
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            $("#stock_s").val(data.stock);
            //$("#cantidad_s").val(data.cantidad);
            $("#precioproducto_s").val(data.precio);
            $("#nombreproducto_s").val(data.nombre);
            $("#valorcompra_s").val(data.costo_proveedor);
        }
    })
})

$("#guardar_s").on("click", function () {
  var url = baseurl + "clientes/crearsalida",
      cantidad = $("#cantidad_s").val(),
      stock = $("#stock_s").val(),
      total = parseInt(stock) - parseInt(cantidad),
      producto = $("#producto_s").val(),
      seccion = $("#seccion_s").val(),
      motivo = $("#motivo_s").val(),
      comentarios = $("#comentarios_s").val();
      if(producto == "") {
        $("#producto_s").addClass("is-invalid");
      }
      else if (cantidad == "") {
        $("#producto_s").removeClass("is-invalid");
        $("#cantidad_s").addClass("is-invalid");

      }
      else if (motivo == "") {
        $("#cantidad_s").removeClass("is-invalid");
        $("#motivo_s").addClass("is-invalid");
      }
      else if (comentarios == "") {
        $("#motivo_s").removeClass("is-invalid");
        $("#comentarios_s").addClass("is-invalid");
      }
      else {

          if(total < 0){
            $("body").overhang({
              type: "confirm",
              primary: "#40D47E",
              accent: "#27AE60",
              yesColor: "#3498DB",
              message: "Esta apunto de dejar un inventario negativo desea continuar?",
              overlay: true,
              callback: function (value) {
                if(value == false){
                }
                else {
                  $.ajax({
                    url: url,
                    method: "POST",
                    data: {
                      cantidad: cantidad,
                      total: total,
                      producto: producto,
                      seccion: seccion,
                      motivo: motivo,
                      comentarios: comentarios
                    },
                    success: function () {
                      $("body").overhang({
                        type: "success",
                        message: "se ha agregado salida correctamente"
                      });
                      setTimeout(reloadPage, 3000);
                    },
                    error: function () {
                      $("body").overhang({
                         type: "error",
                         message: "Alerta ! Tenemos un problema al conectar con la base de datos verifica tu red.",
                      });
                    }
                  })
                }
               }
            });
            }
      else {
        $.ajax({
          url: url,
          method: "POST",
          data: {
            cantidad: cantidad,
            total: total,
            producto: producto,
            seccion: seccion,
            motivo: motivo,
            comentarios: comentarios
          },
          success: function () {
            $("body").overhang({
              type: "success",
              message: "se ha agregado salida correctamente"
          });
            setTimeout(reloadPage, 3000);
          },
          error: function () {
            $("body").overhang({
              type: "error",
              message: "Alerta ! Tenemos un problema al conectar con la base de datos verifica tu red.",
            });
          }
       })
     }
   }
})

$("#stock_reporte").on("change", function () {
  var cantidad = $("#stock_reporte").val();
  var url4 = baseurl + "clientes/consultainventario/" + cantidad;
  $.ajax({
    url: url4,
    method: "GET",
    success: function (data) {
        data = JSON.parse(data);
        inventario = data.map(function (inven) {
          return '<tr><td class="text-uppercase text-dark text-xs font-weight-bolder opacity-12">'+inven.codigo+'</td><td class="text-uppercase text-dark text-xs font-weight-bolder opacity-12">'+inven.nombre+'</td><td class="text-uppercase text-dark text-xs font-weight-bolder opacity-12">'+inven.categorias+'</td><td class="text-uppercase text-dark text-xs font-weight-bolder opacity-12">'+inven.precio+'</td><td class="text-uppercase text-dark text-xs font-weight-bolder opacity-12">'+inven.fecha+'</td><td class="text-uppercase text-dark text-xs font-weight-bolder opacity-12">'+inven.stock+'</td></tr>';
        });
        $("#table-consulta").html(inventario);
        $(".btn-pdf").attr("hidden", false);
    }
  });
})

$("#buscar_kardex").on("click", function () {
  
  let url = baseurl + "clientes/consultarkardex",
  producto_kardex = $("#producto_kardex").val(),
  fecha_inicial = $("#fecha_inicial").val(),
  fecha_final =  $("#fecha_final").val();
  $.ajax({
      url: url,
      method: "POST",
      data: {
          producto_kardex: producto_kardex,
          fecha_inicial: fecha_inicial,
          fecha_final: fecha_final
      },
      success: function (data) {
          data = JSON.parse(data);
          kardex = data.map(function (karde) {
              return '<tr><td>'+karde.codigo_kardex+'</td><td>'+karde.fecha+'</td><td>'+karde.tp_documento+karde.codigo_kardex +'</td><td>'+karde.motivo+'</td><td>'+karde.entrada+'</td><td>'+karde.salida+'</td><td>'+karde.saldo+'</td></tr>'
          });
          $("#table-kardex").html(kardex);
          $("#pdf-kardex").attr("hidden", false);
      }
  })
})


function reloadPage() {
    location.reload();
}