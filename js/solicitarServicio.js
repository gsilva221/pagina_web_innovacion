const solicitarServicioForm = document.getElementById('solicitarServicioForm');
const accountBtn = document.getElementById('accountBtn');

// Validar RUT
function validarRUT(rut) {
  rut = rut.replace(/[^\dk]/gi, '');
  if (rut.length < 7 || rut.length > 8) return false;
  
  let suma = 0;
  let multiplo = 2;
  
  for (let i = rut.length - 2; i >= 0; i--) {
    suma += parseInt(rut.charAt(i)) * multiplo;
    multiplo++;
    if (multiplo > 7) multiplo = 2;
  }
  
  const digito = 11 - (suma % 11);
  const digitoVerificador = rut.charAt(rut.length - 1);
  
  return digito === 10 ? digitoVerificador === 'k' || digitoVerificador === 'K' : 
         digito === 11 ? digitoVerificador === '0' : 
         digito.toString() === digitoVerificador;
}

// Validar fecha mínima (no puede ser en el pasado)
function validarFecha(fecha) {
  const fechaSeleccionada = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  return fechaSeleccionada >= hoy;
}

// Manejar envío del formulario
solicitarServicioForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const rut = document.getElementById('rut').value.trim();
  const carrera = document.getElementById('carrera').value;
  const fecha = document.getElementById('fecha').value;
  const horario = document.querySelector('input[name="horario"]:checked');
  const privacidad = document.getElementById('privacidad').checked;
  
  // Validaciones
  if (!nombre || !email || !rut || !carrera || !fecha || !horario) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }
  
  if (!validarRUT(rut)) {
    alert('El RUT ingresado no es válido. Por favor, verifica el formato.');
    return;
  }
  
  if (!validarFecha(fecha)) {
    alert('La fecha debe ser igual o posterior a hoy.');
    return;
  }
  
  if (!privacidad) {
    alert('Debes aceptar el consentimiento para continuar.');
    return;
  }
  
  // Crear objeto con los datos
  const datosServicio = {
    nombre,
    email,
    rut,
    carrera,
    institucion: document.getElementById('institucion').value || null,
    fecha,
    horario: horario.value,
    comentarios: document.getElementById('comentarios').value || null,
    marketing: document.getElementById('marketing').checked,
    fechaSolicitud: new Date().toISOString()
  };
  
  // Guardar en localStorage
  const solicitudes = JSON.parse(localStorage.getItem('solicitudesServicio')) || [];
  solicitudes.push(datosServicio);
  localStorage.setItem('solicitudesServicio', JSON.stringify(solicitudes));
  
  // Mensaje de éxito
  alert(`¡Solicitud enviada con éxito!\n\nNombre: ${nombre}\nFecha de reunión: ${new Date(fecha).toLocaleDateString('es-CL')}\nHorario: ${horario.value}\n\nNos pondremos en contacto pronto en ${email}.`);
  
  // Redirigir al inicio
  setTimeout(() => {
    window.location.href = 'index.html#contacto';
  }, 1500);
});

// Botón de cuenta
accountBtn.addEventListener('click', () => {
  const datosEstudiante = localStorage.getItem('datosEstudiante');
  if (datosEstudiante) {
    const datos = JSON.parse(datosEstudiante);
    alert(`Bienvenido de vuelta, ${datos.nombre}!`);
  } else {
    window.location.href = 'registro.html';
  }
});

// Establecer fecha mínima en el input de fecha
document.addEventListener('DOMContentLoaded', () => {
  const fechaInput = document.getElementById('fecha');
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const día = String(hoy.getDate()).padStart(2, '0');
  const fechaHoy = `${año}-${mes}-${día}`;
  
  fechaInput.min = fechaHoy;
});
