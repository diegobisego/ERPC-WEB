const instance = axios.create({
  baseURL: 'https://distribuidorabisego3.glitch.me/api',
  // baseURL: 'https://distribuidorabisego.up.railway.app/api/',
  timeout: 10000, // tiempo máximo de espera de respuesta (en milisegundos)
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
