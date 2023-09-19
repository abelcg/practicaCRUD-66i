import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from './validaciones.js';

import { Producto } from './productoClass.js';

//traer los elementos que necesito del html
let campoCodigo = document.getElementById('codigo');
//console.log(campoCodigo);
let campoProducto = document.getElementById('producto');
let campoDescripcion = document.getElementById('descripcion');
let campoCantidad = document.getElementById('cantidad');
let campoURL = document.getElementById('URL');
let formProducto = document.getElementById('formProducto');

let productoExistente = false; //variable bandera: si el productoExistente es false quiero crearlo,
//si  productoExistente es true quiero modificar el producto existente
let listaProductos = [];

//asociar un evento a cada elemento obtenido

campoCodigo.addEventListener('blur', () => {
  console.log('desde codigo');
  campoRequerido(campoCodigo);
});

campoProducto.addEventListener('blur', () => {
  console.log('desde producto');
  campoRequerido(campoProducto);
});

campoDescripcion.addEventListener('blur', () => {
  console.log('desde descripcion');
  campoRequerido(campoProducto);
});

campoCantidad.addEventListener('blur', () => {
  console.log('desde cantidad');
  validarNumeros(campoCantidad);
});

campoURL.addEventListener('blur', () => {
  console.log('desde url');
  validarURL(campoURL);
});

formProducto.addEventListener('submit', guardarProducto);

//aquí empieza la lógica del CRUD

function guardarProducto(e) {
  //para prevevier la actualización de la página
  e.preventDefault();
  //verificar que todos los datos sean correctos

  if (
    validarGeneral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
    )
  ) {
    console.log('los datos correctos listos para enviar');
    if (!productoExistente) {
      //crear producto
      crearProducto();
    } else {
      //modificar producto
      modificarProducto();
    }
  }
}

function crearProducto() {
  //crear un objeto producto
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );

  console.log(productoNuevo);

  listaProductos.push(productoNuevo);

  console.log(listaProductos);
}
