/************************** LETRA USER ***************************** */

//Alimenta al panelAdmin para mostrar la Letra del nombre dentro del user

const letraUser = document.querySelector("#letraUser");
let usuario = localStorage.getItem("user");
letraUser.innerHTML = usuario.slice(0, 1);
