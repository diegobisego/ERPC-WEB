//evito el reinicio de la pagina
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

/************************** ARRAYS ADICIONALES ***************************** */

//Carga el select tamaño/peso de productos desd el array
let tamTipo = ["", "UN", "G", "Kg", "L"];
const idUM = document.querySelector("#idUM");

for (const i of tamTipo) {
  const option = document.createElement("option");
  idUM.appendChild(option);
  option.innerHTML = i;
  option.setAttribute("value", i);
}

/************************** FETCH GET ***************************** */

let productos = [];
let contadorId;

//Metodo GET para FETCH de productos, para luego comparar contenido
fetch("http://localhost:5000/productos")
  .then((res) => res.json())
  .then((data) => {
    productos.push(...data);
  });

/************************** DOM Y EVENTO AGREGAR ***************************** */

//recupero el boton cargar producto
const boton = document.querySelector("#btn-carga");

//traigo por dom todos los textbox y select
const tipoProducto = document.querySelector("#inTipo");
const tipoTamPeso = document.querySelector("#inCantidad");
const precio = document.querySelector("#inPrecio");
const stock = document.querySelector("#inStock");
let UM;

idUM.addEventListener("change", (event) => {
  UM = event.target.value;
});

//evento de boton
boton.addEventListener("click", () => {
  //verifico campos vacios
  if (
    tipoProducto.value == "" ||
    tipoTamPeso.value == "" ||
    precio.value == "" ||
    stock.value == ""
  ) {
    invalido(6);
    return;
  }

  //Verifico si el array esta vacio, se llena
  if (productos.length == 0) {
    contadorId = 1;
    PostProducto(contadorId, tipoProducto, tipoTamPeso, precio, stock);
    return;
  }

  //verifico que no cargue 2 veces el mismo producto
  for (const key in productos) {
    if (
      productos[key].tipo == tipoProducto.value &&
      productos[key].tamanio == tipoTamPeso.value
    ) {
      alertCarga(2, "producto");
      form.reset();
      return;
    }
  }

  contadorId = productos.id + 1;
  PostProducto(contadorId, tipoProducto, tipoTamPeso, precio, stock);
});

/************************** FUNCIONES AGREGAR PRODUCTO CON POST ***************************** */

const PostProducto = (contadorId, tipoProducto, tipoTamPeso, precio, stock) => {
  //realizo un setTimeOut porque LiveServer junto con json server me resetea la pagina al dispararse el Fetch
  //Esto hace q las alertas posteriores al fetch no se ejecuten, por ende lo coloco asi para q pueda visualizarse
  setTimeout(() => {
    fetch("http://localhost:5000/Productos", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        tipo: tipoProducto.value,
        tamanio: Number(tipoTamPeso.value),
        um: UM,
        precio: Number(precio.value),
        stock: Number(stock.value),
        id: contadorId,
      }),
    });
  }, 800);
  alertCarga(1, "producto");
};
