//clase
class Producto {
    constructor(id, tipo, tamanio, precio,stock) {
        (this.id = Number(id)),
        (this.tipo = tipo),
        (this.tamanio = tamanio),
        (this.precio = Number(precio)),
        (this.stock = Number(stock));
    }
  }