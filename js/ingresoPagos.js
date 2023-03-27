const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

/************* FECHA ACTUAL ******************/

window.onload = function () {
  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //obteniendo mes
  let dia = fecha.getDate(); //obteniendo dia
  let ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
  document.getElementById("inFechaPago").value = ano + "-" + mes + "-" + dia;
};

/************* CARGA CLIENTES ******************/

let clientes = [];

//Metodo GET para FETCH de clientes
fetch("http://localhost:5000/clientes")
  .then((res) => res.json())
  .then((data) => {
    clientes.push(...data);
    cargaClientes();
  });

/************* CARGA CLIENTES ******************/

//clientes

const opCliente = document.querySelector("#opCliente");

const cargaClientes = () => {
  for (const i in clientes) {
    const option = document.createElement("option");
    opCliente.appendChild(option);
    option.innerHTML = clientes[i].nombre;
    option.setAttribute("value", clientes[i].id);
  }
};

/************************** ARRAYS FORMA DE PAGO ***************************** */

//Carga el select tipo de pago
let tipoPagoArr = ["Contado Efectivo", "Transferencia", "Cheque"];

//template forma de pago
const tipoPago = document.querySelector("#tipoPago");
const tempTipoPAgo = document.querySelector("#tempTipoPAgo");
const divTipoPago = tempTipoPAgo.content.querySelector("#divTipoPago");

tipoPagoArr.forEach((elem, index) => {
  let prodClone = divTipoPago.cloneNode(divTipoPago, true);
  prodClone.children[0].setAttribute("for", index);
  prodClone.children[0].setAttribute("id", index);
  prodClone.children[1].setAttribute("for", index);
  prodClone.children[0].setAttribute("id", index);
  prodClone.children[0].setAttribute("name", "RadioTipoPago");
  prodClone.children[1].setAttribute("name", "labelTipoPago");
  prodClone.children[1].innerText = elem;

  if (index == 0) {
    prodClone.children[0].setAttribute("checked", "true");
  }

  tipoPago.appendChild(prodClone);
});

/************************** ARRAYS BANCOS ***************************** */

let bancos = [
  "Santander",
  "BBVA",
  "HSBC",
  "BNA",
  "Credicoop",
  "Frances",
  "Bancor",
];
const opBanco = document.querySelector("#opBanco");

for (const i of bancos) {
  const option = document.createElement("option");
  opBanco.appendChild(option);
  option.innerHTML = i;
  option.setAttribute("value", i);
}

/************************** DESPLIEGA OPCIONES DE CHEQUE ***************************** */

const datosParaCheques = document.querySelector("#datosParaCheques");

tipoPago.addEventListener("change", (event) => {
  if (event.target.id == 2) {
    datosParaCheques.style.display = "flex";
  } else {
    datosParaCheques.style.display = "none";
  }
});

/************************** FETCH SALDOS ***************************** */
let saldos = [];

fetch("http://localhost:5000/saldos")
  .then((res) => res.json())
  .then((data) => {
    saldos.push(...data);
  });

/************************** BOTON INGRESO DE PAGO ***************************** */

const btnCargaPago = document.querySelector("#btnCargaPago");

const inFechaPago = document.querySelector("#inFechaPago");
const inPago = document.querySelector("#inPago");
const RadioTipoPago = document.getElementsByName("RadioTipoPago");
const labelChecked = document.getElementsByName("labelTipoPago");

//datos del cheque
const inFechaCheque = document.querySelector("#inFechaCheque");
const inMontoCheque = document.querySelector("#inMontoCheque");
const inNombreEmisorCheque = document.querySelector("#inNombreEmisorCheque");

//btn cargar pago
btnCargaPago.addEventListener("click", () => {
  if (inPago.value == "" || opCliente.value == "Seleccione un cliente") {
    invalido(6);
    return;
  }

  let selecTipoPago;

  //verifico radio chequeado y lo paso como texto
  for (var i = 0; i < RadioTipoPago.length; i++) {
    if (RadioTipoPago[i].checked) {
      selecTipoPago = labelChecked[i].innerHTML;
      break;
    }
  }

  //traigo nombre para guardar en base de datos
  let nombreCliente;

  for (const key in clientes) {
    if (clientes[key].id == opCliente.value) {
      nombreCliente = clientes[key].nombre;
      break;
    }
  }

  //funcion POST
  setTimeout(() => {
    fetch("http://localhost:5000/pagos", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        fechaPagp: inFechaPago.value,
        idCliente: opCliente.value,
        cliente: nombreCliente,
        montoPago: Number(inPago.value),
        tipoPago: selecTipoPago,
        fechaCheque: inFechaCheque.value,
        nombreEmisorCheque: inNombreEmisorCheque.value,
        bancoCheque: opBanco.value,
      }),
    }).then(restaSaldo(opCliente.value, nombreCliente, Number(inPago.value)));
  }, 800);
  alertCarga(1, "Pago");
});

const restaSaldo = (id, nombre, monto) => {
  let existe = saldos.some((elem) => elem.id == id);
  let haber;
  let saldo;

  if (existe) {
    for (const key in saldos) {
      if (saldos[key].id == id) {
        haber = saldos[key].haber + monto;
        saldo = saldos[key].saldo - monto;
        break;
      }
    }

    fetch(`http://localhost:5000/saldos/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        haber: haber,
        saldo: saldo,
      }),
    });
  } else {
    fetch("http://localhost:5000/saldos", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: id,
        nombre: nombre,
        debe: 0,
        haber: monto,
        saldo: 0 - monto,
      }),
    });
  }
};
