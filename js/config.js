const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 5000, // tiempo máximo de espera de respuesta (en milisegundos)
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
