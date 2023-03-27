// import Swal from 'sweetalert2'

const alertCarga = (tipo, param) => {
  switch (tipo) {
    case 1:
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${param} fue cargado con Exito!`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      break;
    case 2:
      Swal.fire({
        position: "center",
        icon: "error",
        title: `El ${param} ya existe`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      break;
    case 3:
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Registro de ${param} exitoso`,
        showConfirmButton: false,
        timer: 1500,
      });
      break;
    case 4:
      Swal.fire({
        position: "center",
        icon: "success",
        title: `El ${param} fue modificado con exito!`,
        showConfirmButton: false,
        timer: 1500,
      });
      break;
    default:
      break;
  }
};

const alertEliminar = (param) => {
  Swal.fire({
    position: "bottom-end",
    icon: "success",
    title: `El ${param} fue Eliminado`,
    showConfirmButton: false,
    timer: 1000,
    toast: true,
  });
};

const alertEliminarConfirm = (param, fn) => {
  Swal.fire({
    title: "¿Desea eliminar el producto?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    denyButtonText: `Volver`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      fn();
      Swal.fire(`Se elimino el ${param} en forma correcta`, "", "success");
    } else if (result.isDenied) {
      Swal.fire(`No se elimino el ${param}`, "", "info");
    }
  });
};

//validaciones de ingresos usuarios invalidos
const invalido = (data) => {
  Swal.fire({
    position: "top",
    icon: "error",
    title: data,
    showConfirmButton: false,
    timer: 4000,
    toast: true,
  });
};
