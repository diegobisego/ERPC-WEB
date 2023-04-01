import instance from "./config.js";

//evito el reinicio de la pagina
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

/************************** BOTON INGRESAR ***************************** */

const btnIngresar = document.querySelector("#btnIngresar");

btnIngresar.addEventListener("click", () => {
  //capturo el usuario y pass del formulario
  let user = document.querySelector("#usuario").value;
  const password = document.querySelector("#password").value;

  email = user.toLowerCase(); //paso a minusculas

  const newLogin = {
    email,
    password,
  };

  postLogin(newLogin);
});

/************************** FUNCION LOGIN ***************************** */

const postLogin = (data) => {
  try {
    instance // instancia de axios
      .post("/login", data)
      .then((response) => {

        console.log(response)

      //   if (response.data.seccion == "mail" && response.data.success == false) {
      //     return invalido(6, response.data.result); //si es mail con false, da la alerta del incorrecto correo
      //   }
      //   if (response.data.seccion == "pass" && response.data.success == false) {
      //     return invalido(2);
      //   }

      //   alertCarga(1, "Usuario"); //si dice user y es true realiza la carga del usuario
      //   setTimeout(() => {
      //     window.location.replace(response.request.responseURL);
      //   }, 1000);
      // })
      // .catch((error) => {
      //   console.log(error);
      });
  } catch (error) {
    throw new Error(
      "Se produjo un error al intentar enviar el registro e usuario: " + error
    );
  }
};
