//  DARK-MODE

const btnCambiodark = document.querySelector('#cambio-dark');

btnCambiodark.addEventListener('click', () => {

document.body.classList.toggle('mode-dark-bg');
btnCambiodark.classList.toggle('active');

  
document.body.classList.contains('mode-dark-bg') ? localStorage.setItem('dark-mode','true') : localStorage.setItem('dark-mode','false')

})

if (localStorage.getItem('dark-mode') == 'true') {
  
 document.body.classList.add('mode-dark-bg');
 btnCambiodark.classList.add('active');

} else {
  
  document.body.classList.remove('mode-dark-bg');
  btnCambiodark.classList.remove('active');
  
}

