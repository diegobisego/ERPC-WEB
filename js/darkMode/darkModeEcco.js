// DARK-MODE

const btnCambiodark = document.querySelector('#cambio-dark');
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const productsList = document.querySelector('#div-product')
const btnComprar = document.querySelectorAll('#ftListEcco>div>button')
const divDark = document.querySelectorAll('#ftListEcco')

btnCambiodark.addEventListener('click', () => {
  
  document.body.classList.toggle('bg-dark');
  btnCambiodark.classList.toggle('active');
  nav.classList.toggle('mode-dark-nav-bg')
  nav.classList.toggle('bg-dark')
  main.classList.toggle('mode-dark-nav-bg')
  main.classList.toggle('bg-dark')

  btnComprar.forEach((elem) => {
    elem.classList.toggle('btn-outline-light')
    elem.classList.toggle('btn-outline-dark')
  })


  document.body.classList.contains('bg-dark') ? localStorage.setItem('dark-mode','true') : localStorage.setItem('dark-mode','false')

})

if (localStorage.getItem('dark-mode') == 'true') {
  
  document.body.classList.add('bg-dark');
  btnCambiodark.classList.add('active');
  nav.classList.toggle('mode-dark-nav-bg');
  nav.classList.toggle('bg-dark');
  main.classList.toggle('mode-dark-nav-bg');
  main.classList.toggle('bg-dark');

  btnComprar.forEach((elem) => {
    elem.classList.toggle('btn-outline-light')
    elem.classList.toggle('btn-outline-dark')
  })

} else {
  document.body.classList.remove('bg-dark');
  btnCambiodark.classList.remove('active');
  
}