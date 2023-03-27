//Funcion de bienvenida una vez que se loguea el usuario

let usuario = localStorage.getItem("user");

usuario = usuario.charAt(0).toUpperCase() + usuario.slice(1);

const bienvenida = () => {
  const user = document.querySelector("#user");
  user.innerText = " " + usuario;

  const textWrapper = document.querySelector(".ml14 .letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: false })
    .add({
      targets: ".ml14 .line",
      scaleX: [0, 1],
      opacity: [0.5, 1],
      easing: "easeInOutExpo",
      duration: 900,
    })
    .add({
      targets: ".ml14 .letter",
      opacity: [0, 1],
      translateX: [40, 0],
      translateZ: 0,
      scaleX: [0.3, 1],
      easing: "easeOutExpo",
      duration: 800,
      offset: "-=600",
      delay: (el, i) => 150 + 25 * i,
    })
    .add({
      targets: ".ml14",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000,
    });
  setTimeout(() => {
    window.location.href = "../panelAdmin.html";
  }, 3000);
};

bienvenida();
