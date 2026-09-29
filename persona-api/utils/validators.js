// ==========================================================
// utils/validators.js
// Validadores personalizados para los datos de Persona.
// Se usan desde la capa de "services" ANTES de tocar la base
// de datos, siguiendo el principio de no confiar nunca en los
// datos que llegan del cliente (req.body).
// ==========================================================

const { REGLAS_PERSONA } = require('./constants');

// Acepta letras (incluye tildes y enie) y espacios, para nombres/apellidos
const REGEX_SOLO_LETRAS = /^[A-Za-zÀ-ÿñÑ\s]+$/;

// Formato de fecha esperado: YYYY-MM-DD (el mismo que usa un <input type="date">)
const REGEX_FECHA_ISO = /^\d{4}-\d{2}-\d{2}$/;

// Valida nombres/apellidos: debe ser texto, con una longitud razonable
// y compuesto unicamente por letras y espacios.
function esTextoValido(valor, longitudMinima = REGLAS_PERSONA.NOMBRE_LONGITUD_MINIMA, longitudMaxima = REGLAS_PERSONA.NOMBRE_LONGITUD_MAXIMA) {
  if (typeof valor !== 'string') return false;
  const textoLimpio = valor.trim();
  return (
    textoLimpio.length >= longitudMinima &&
    textoLimpio.length <= longitudMaxima &&
    REGEX_SOLO_LETRAS.test(textoLimpio)
  );
}

// Valida que la edad sea un numero entero dentro de un rango logico
function esEdadValida(valor) {
  const edad = Number(valor);
  return (
    Number.isInteger(edad) &&
    edad >= REGLAS_PERSONA.EDAD_MINIMA &&
    edad <= REGLAS_PERSONA.EDAD_MAXIMA
  );
}
// Valida que la fecha de nacimiento tenga formato YYYY-MM-DD,
// sea una fecha real y no sea una fecha futura
function esFechaValida(valor) {
  if (typeof valor !== 'string' || !REGEX_FECHA_ISO.test(valor)) return false;

  const fecha = new Date(valor);
  const esFechaReal = !Number.isNaN(fecha.getTime());
  const noEsFechaFutura = fecha.getTime() <= Date.now();

  return esFechaReal && noEsFechaFutura;
}

// Valida que el id recibido por parametro de ruta sea un entero positivo
function esIdValido(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0;
}
// Valida el objeto completo que llega en el body de una peticion
// POST o PUT, y devuelve tanto el resultado como la lista de errores
function validarDatosPersona(datos = {}) {
  const errores = [];
  const { firstname, lastname, age, datebirth } = datos;

  if (!esTextoValido(firstname)) {
    errores.push('El campo "firstname" es obligatorio, debe tener entre 2 y 100 caracteres y solo contener letras.');
  }

  if (!esTextoValido(lastname)) {
    errores.push('El campo "lastname" es obligatorio, debe tener entre 2 y 100 caracteres y solo contener letras.');
  }

  if (!esEdadValida(age)) {
    errores.push('El campo "age" debe ser un numero entero entre 1 y 120.');
  }

  if (!esFechaValida(datebirth)) {
    errores.push('El campo "datebirth" debe tener el formato YYYY-MM-DD y no puede ser una fecha futura.');
  }

  return { esValido: errores.length === 0, errores };
}

module.exports = {
  esTextoValido,
  esEdadValida,
  esFechaValida,
  esIdValido,
  validarDatosPersona,
};