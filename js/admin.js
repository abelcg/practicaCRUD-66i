//traer los elementos que necesito del html
let campoCodigo = document.getElementById('codigo');
//console.log(campoCodigo);
let campoProducto = document.getElementById('producto');
let campoDescripcion = document.getElementById('descripcion');
let campoCantidad = document.getElementById('cantidad');
let campoURL = document.getElementById('URL');

//validaciones

const campoRequerido = (input) => {
  console.log('desde campo requerido');
  console.log(input.value);
  if (input.value.length > 0) {
    console.log('aqui esta todo bien');
    input.className = 'form-control is-valid';
    return true;
  } else {
    console.log('aqui muestro el error');
    input.className = 'form-control is-invalid';
    return false;
  }
};

const validarNumeros = (input) => {
  //vamos a usar o a crear una expresión regular
  let patron = /^[0-9]{1,3}$/;
  //el método test me sirve para comparar un string con el patron y duevuelve true o false si hay match o no
  //regex.test('stirng a validar')
  if (patron.test(input.value)) {
    //cumpla con la expresión regular
    input.className = 'form-control is-valid';
    return true;
  } else {
    input.className = 'form-control is-invalid';
    return false;
  }
};

const validarURL = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    //cumpla con la expresión regular
    input.className = 'form-control is-valid';
    return true;
  } else {
    input.className = 'form-control is-invalid';
    return false;
  }
};

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
  validarURL(campoURL)
});
