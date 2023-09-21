export class Producto {
  constructor(
    parametroCodigo,
    parametroProducto,
    parametroDescripcion,
    parametroCantidad,
    parametroUrl
  ) {
    this.codigo = parametroCodigo;
    this.producto = parametroProducto;
    this.descripcion = parametroDescripcion;
    this.cantidad = parametroCantidad;
    this.url = parametroUrl;
  }

  //getters y setters

  get mostrarCodigo() {
    return this.codigo;
  }
  get mostrarProducto() {
    return this.producto;
  }
  get mostrarDescripcion() {
    return this.descripcion;
  }
  get mostrarCantidad() {
    return this.cantidad;
  }
  get mostrarUrl() {
    return this.url;
  }

  set modificarCodigo(nuevoCodigo) {
    this.codigo = nuevoCodigo;
  }
  set modificarProducto(nuevoProducto) {
    this.producto = nuevoProducto;
  }
  set modificarDescripcion(nuevoDescripcion) {
    this.descripcion = nuevoDescripcion;
  }
  set modificarCantidad(nuevoCantidad) {
    this.cantidad = nuevoCantidad;
  }
  set modificarUrl(nuevoUrl) {
    this.url = nuevoUrl;
  }
}
