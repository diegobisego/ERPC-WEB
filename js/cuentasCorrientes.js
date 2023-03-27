//Metodo GET para FETCH de ventas, para luego comparar contenido

let saldos = [];

fetch("http://localhost:5000/saldos")
  .then((res) => res.json())
  .then((data) => {
    saldos.push(...data);
    cargarCuentasCorrientes();
  });

//genero lista de estado de cuentas corrientes por DOM con template

const cargarCuentasCorrientes = () => {
  const mainCuentasCorrientes = document.querySelector(
    "#mainCuentasCorrientes"
  );
  const templateCuentasCorrientes = document.querySelector(
    "#templateCuentasCorrientes"
  ).content;

  const fragmento = document.createDocumentFragment();

  saldos.forEach((elem) => {
    //traigo todos los elementos para insertar los saldos
    templateCuentasCorrientes.querySelector("#idClienteLista").innerHTML =
      elem.id;
    templateCuentasCorrientes.querySelector("#nombreCliente").innerHTML =
      elem.nombre;
    templateCuentasCorrientes.querySelector("#debeCliente").innerHTML =
      "$ " + elem.debe;
    templateCuentasCorrientes.querySelector("#haberCliente").innerHTML =
      "$ " + elem.haber;
    templateCuentasCorrientes.querySelector("#saldoCliente").innerHTML =
      "$ " + elem.saldo;

    //condicional para linea de campo si tiene deuda o esta al dia
    const estadoDeuda = templateCuentasCorrientes.querySelector("#idPorEstado");

    if (elem.saldo > 0) {
      estadoDeuda.setAttribute("class", "table-danger");
    } else {
      estadoDeuda.setAttribute("class", "table-success");
    }

    let clone = document.importNode(templateCuentasCorrientes, true);
    fragmento.appendChild(clone);
  });

  mainCuentasCorrientes.appendChild(fragmento);
};
