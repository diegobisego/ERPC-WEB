//evento para cerrar sesion
const btnUser = document.querySelector("#btnUser");

btnUser.addEventListener("click", () => {
  Swal.fire({
    title: "Desconexion",
    text: "¿Desea cerrar sesion?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d32",
    cancelButtonColor: "#abb",
    confirmButtonText: "Cerrar Sesion",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("user", "");
      window.location.href = "../index.html";
    }
  });
});
