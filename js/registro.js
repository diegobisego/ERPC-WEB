import instance from "./config.js";

const formregistro = document.querySelector("#btnRegistrar");
formregistro.addEventListener("submit", (e) => {
  e.preventDefault();
});

/************************** POST REGISTRO ***************************** */
const btnRegistrar = document.querySelector("#btnRegistrar");

btnRegistrar.addEventListener("click", () => {
  //captura los datos de usuario y pass
  const regMail = document.querySelector("#regMail").value;
  const regPass = document.querySelector("#regPass").value;
  const regPassRepeat = document.querySelector("#regPassRepeat").value;

  if (regPass !== regPassRepeat) {
    return invalido(7);
  }

  const newUser = {
    mail: regMail,
    pass: regPass,
  };

  //funcion para agregar un usuario mediante axios
  postRegistro(newUser);
});

/************************** FUNCIONES ***************************** */

//funcion para hacer post de user
const postRegistro = (data) => {
  try {
    instance // instancia de axios
      .post("/register", data)
      .then((response) => {
        if (response.data.seccion == "mail" && response.data.success == false) {
          return invalido(6, response.data.result); //correo ya existente
        }
        if (response.data.seccion == "pass" && response.data.success == false) {
          return invalido(2); //password invalido
        }

        alertCarga(1, "Usuario"); //sino, se carga el nuevo usuario
        setTimeout(() => {
          window.location.replace(response.request.responseURL);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    throw new Error(
      "Se produjo un error al intentar enviar el registro e usuario: " + error
    );
  }
};
