//validaciones

export const campoRequerido = (input) => {
  console.log('desde campo requerido');
  console.log(input.value);
  if (input.value.trim()?.length > 0) {
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

const validarGeneral = (
  campoCodigo,
  campoProducto,
  campoDescripcion,
  campoCantidad,
  campoURL
) => {
  let alerta = document.querySelector('#mjeAlerta');
  //comprobar que pasen cada una de las validaciones y si no pasan mostrar el alert
  if (
    campoRequerido(campoCodigo) &&
    campoRequerido(campoProducto) &&
    campoRequerido(campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarURL(campoURL)
  ) {
    console.log(
      'validación correcta todos los datos están listos para ser enviados'
    );
    alerta.className = 'alert alert-danger my-3 d-none';
    return true;
  } else {
    console.log('validación incorrecta, datos erroneos');
    alerta.className = 'alert alert-danger my-3';
    return false;
  }
};

//pueden usar export general como el siguiente
//o anteponer la palabra export en cada definicion de función a exportar
export {
    validarNumeros,
    validarURL,
    validarGeneral,
  }
