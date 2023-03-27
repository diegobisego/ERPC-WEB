const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const formVentas = document.querySelector("#formVentas");
formVentas.addEventListener("submit", (e) => {
  e.preventDefault();
});

/************* CONSTANTES ******************/

//template para lista de venta
const tVentas = document.querySelector("#tVentas"); //primero
const tempDetalleVenta = document.querySelector("#tempDetalleVenta"); //segundo
const trTemp = tempDetalleVenta.content.querySelector("#trTemp");

//productos
const idVtaProd = document.querySelector("#idVtaProd");
const btnagregarListaVenta = document.querySelector("#btnagregarListaVenta");
const precioUnitario = document.querySelector("#inPrecUni");
const cantidad = document.querySelector("#inCantidadVenta");

//clientes
const opCliente = document.querySelector("#opCliente");

//tipo pago
const opTipoPago = document.querySelector("#opTipoPago");

/************* FECHA ACTUAL ******************/

window.onload = function () {
  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //obteniendo mes
  let dia = fecha.getDate(); //obteniendo dia
  let ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
  document.getElementById("inDate").value = ano + "-" + mes + "-" + dia;
};

/************* ARRAYS PARA GET ******************/

let productos = [];
let clientes = [];
let ventas = [];
let tipoPago = ['Contado Efectivo', 'Transferencia', 'Cheque']

/************* FETCH GET ******************/

//Metodo GET para FETCH de productos
fetch("http://localhost:5000/productos")
  .then((res) => res.json())
  .then((data) => {
    productos.push(...data);
    cargaProductos();
  });

//Metodo GET para FETCH de clientes
fetch("http://localhost:5000/clientes")
  .then((res) => res.json())
  .then((data) => {
    clientes.push(...data);
    cargaClientes();
    cargaTipoPago();
  });

//Metodo GET para FETCH de ventas
fetch("http://localhost:5000/ventas")
  .then((res) => res.json())
  .then((data) => {
    ventas.push(...data);
  });

/************* CARGA SELECCIONES ******************/

idVtaProd.addEventListener("change", () => {
  const seleccion = idVtaProd.options[idVtaProd.selectedIndex].text;

  productos.find((element) => {
    let producto = element.tipo + " " + element.tamanio + " " + element.um;
    if (producto == seleccion) precioUnitario.value = element.precio;
  });
});

const cargaProductos = () => {
  for (const i in productos) {
    const option = document.createElement("option");
    idVtaProd.appendChild(option);
    option.innerHTML =
      productos[i].tipo + " " + productos[i].tamanio + " " + productos[i].um;
    option.setAttribute("value", i);
  }
};

const cargaClientes = () => {
  for (const i in clientes) {
    const option = document.createElement("option");
    opCliente.appendChild(option);
    option.innerHTML = clientes[i].nombre;
    option.setAttribute("value", clientes[i].nombre);
  }
};

const cargaTipoPago = () => {
  for (const i in tipoPago) {
    const option = document.createElement("option");
    opTipoPago.appendChild(option);
    option.innerHTML = tipoPago[i];
    option.setAttribute("value",tipoPago[i]);
  }
};

/************* SE AGREGA VENTA A LA LISTA ******************/

let listaProducto = [];
let contador = 0;
let total = 0;

btnagregarListaVenta.addEventListener("click", () => {
  const producto = idVtaProd.options[idVtaProd.selectedIndex].text;
  const cant = Number(cantidad.value);
  const precio = Number(precioUnitario.value);
  contador++;

  if (producto == "" || cant == "" || precio == "") {
    invalido(6);
    return;
  }

  const prodClone = trTemp.cloneNode(trTemp, true);
  prodClone.children[0].innerText = contador;
  prodClone.children[1].innerText = producto;
  prodClone.children[2].innerText = cant;
  prodClone.children[3].innerText = precio * cant;

  listaProducto.push({
    contador: contador,
    producto: producto,
    cantidad: cant,
    "totaProduc:": precio * cant,
  });

  total += precio * cant;

  let btn = prodClone.querySelector("#btnEliminar");

  //evento para eliminar el producto
  btn.addEventListener("click", () => {
    const index = listaProducto.findIndex((item) => item.id == contador);
    const parent = btn.parentNode.parentNode;
    total -= precio * cant;
    idTotalVenta.innerHTML = total;

    listaProducto.splice(index, 1);
    parent.parentNode.removeChild(parent);

    //en alertas.js
    alertEliminar("producto");
  });

  tVentas.appendChild(prodClone);
  idTotalVenta.innerHTML = total;
  form.reset();
});

/************* FINALIZAR VENTA ******************/

const btnFinalizarVenta = document.querySelector("#btnFinalizarVenta");

btnFinalizarVenta.addEventListener("click", () => {
  //sirve para verificar que la lista no este vacia antes de finalizar la venta
  const tieneHijos = document.querySelector("#tVentas").childElementCount;

  if (
    inDate.value == "" ||
    opCliente.value == "Seleccione un cliente" ||
    opTipoPago.value == "Seleccione un tipo" ||
    tieneHijos == 1
  ) {
    invalido(6);
    return;
  }

  let clienteNombre = opCliente.value;
  let clienteId = 0;

  for (const key in clientes) {
    if (clienteNombre == clientes[key].nombre) {
      clienteId = clientes[key].id;
      break;
    }
  }

  setTimeout(() => {
    fetch("http://localhost:5000/Ventas", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        fecha: inDate.value,
        nroFactura: inNroFactura.value,
        Cliente: opCliente.value,
        tipoPago: opTipoPago.value,
        montoTotal: Number(total),
        listaProducto,
      }),
    }).then(agregarSaldo(total, clienteId, clienteNombre)),
      1800;
  });
  alertCarga(1, "venta");
});

/************* AGREGAR EL SALDO A LA CUENTA DEL CLIENTE ******************/

let saldos = [];

//Metodo GET para FETCH de ventas
fetch("http://localhost:5000/saldos")
  .then((res) => res.json())
  .then((data) => {
    saldos.push(...data);
  });

//metodo POST y PUT para cargar saldos en las cuentas
const agregarSaldo = (total, clienteId, clienteNombre) => {
  let existe = saldos.some((saldoId) => saldoId.id == clienteId);

  if (existe) {
    for (const key in saldos) {
      if (saldos[key].id == clienteId) {
        totalDebe = total + saldos[key].debe;
        totalSaldo = total + saldos[key].saldo;

        fetch(`http://localhost:5000/saldos/${clienteId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            debe: totalDebe,
            saldo: totalSaldo,
          }),
        });
        break;
      }
    }
  } else {
    fetch("http://localhost:5000/saldos", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: clienteId,
        nombre: clienteNombre,
        debe: total,
        haber: 0,
        saldo: total,
      }),
    });
  }
};
