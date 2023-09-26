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

//Si hay productos el localStorage quiero guardarlos en listaProductos si no q sea un array vacio
let listaProductos =
  JSON.parse(localStorage.getItem('arrayProductosKey')) || [];

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

//llamo a carga inicial: so tengo productos en localStorage que lo muestre en la tabla de productos
cargaInicial();

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
  //invocar una función codigoUnico() ---> retornar un código único
  // const codUnico = codigoUnico()
  //hacer que el campoCodigo este disable
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
  //limpiar el formulario
  limpiarFormulario();
  //guardar el array de productos dentro dee localStorage
  guadarLocalStorage();
  //mostrar el cartel al usuario
  Swal.fire(
    'Producto creado!',
    'El producto fue creado correctamente!',
    'success'
  );
  //cargar el producto en la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiamos los values del formulario
  formProducto.reset();
  //resetear las clases de los input
  campoCodigo.className = 'form-control';
  campoProducto.className = 'form-control';
  campoDescripcion.className = 'form-control';
  campoCantidad.className = 'form-control';
  campoURL.className = 'form-control';
  //resetear la varibale bandera o booleana para el caso de modificarProducto
  productoExistente = false;
}

function guadarLocalStorage() {
  localStorage.setItem('arrayProductosKey', JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProducto = document.querySelector('#tablaProducto');
  //usamos el operador de asignación por adición para concatenar con lo que ya tengo de contenido
  tablaProducto.innerHTML += `<tr>
  <td>${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad}</td>
  <td>${producto.url}</td>
  <td>
  <button class='btn btn-warning mb-3' onclick='prepararEdicionProducto("${producto.codigo}")'>Editar</button>
  <button class='btn btn-danger mb-3' onclick='borrarProducto("${producto.codigo}")'>Eliminar</button>
  </td>
</tr>`;
}

function cargaInicial() {
  if (listaProductos.length > 0) {
    //crear filas
    listaProductos.map((itemProducto) => crearFila(itemProducto));
    //listaProductos.forEach((itemProducto) => crearFila(itemProducto));
  }
}

/* 
al intentar acceder a una función que se invoca desde el html no la encuetra
para solucionarlo agrego la función como un método del objeto globa window
function prepararEdicionProducto(){
   console.log('desde editar');
}
 */

window.prepararEdicionProducto = function (codigo) {
  //console.log('desde editar');
  //console.log(codigo);
  //buscar el prodcuto en el array de productos
  let productoBuscado = listaProductos.find(
    (itemProducto) => itemProducto.codigo === codigo
  );
  console.log(productoBuscado);

  //mostrar el producto en el formulario. No se debe de poder editar le código
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoURL.value = productoBuscado.url;

  //modifico la variable bandera productoExistente
  productoExistente = true;
};

function modificarProducto() {
  console.log('desde modificar');
  //encontrar la posición del elemento que quiero modificar dentro de mi array de productos
  let indiceProducto = listaProductos.findIndex(
    (itemProducto) => itemProducto.codigo === campoCodigo.value
  );
  console.log(indiceProducto);

  //modificar los valores del elemento couyo indice encontramos
  listaProductos[indiceProducto].producto = campoProducto.value;
  listaProductos[indiceProducto].descripcion = campoDescripcion.value;
  listaProductos[indiceProducto].cantidad = campoCantidad.value;
  listaProductos[indiceProducto].url = campoURL.value;

  //actualizar el localStorage
  guadarLocalStorage();

  //actualizar la tabla
  borrarTabla();
  cargaInicial();

  //mostrar cartel al usuario
  Swal.fire(
    'Producto modificado!',
    'El producto fue modificado correctamente!',
    'success'
  );

  //limpiar formulario y reseta la variable bandera
  limpiarFormulario();
}

function borrarTabla() {
  let tablaProducto = document.querySelector('#tablaProducto');
  tablaProducto.innerHTML = '';
}

window.borrarProducto = function (codigo){
  //opción 1: encontar la posición o el indice del elemento del array y borrarlo
  //1ero: encontrar el indice con findIndex y usar splice(indiceEncontrado, 1)
  
  //opción 2: usando filter

  let nuevaListaProductos = listaProductos.filter((itemProducto)=> itemProducto.codigo !== codigo)
  console.log(nuevaListaProductos);
  //actualizar el array original y guardar en localStorage
  listaProductos = nuevaListaProductos;
  guadarLocalStorage();

  //actualizar la tabla
  borrarTabla();
  cargaInicial();

  //mostrar cartel al usuario
  Swal.fire(
    'Producto eliminado!',
    'El producto fue eliminado correctamente!',
    'success'
  );
}
