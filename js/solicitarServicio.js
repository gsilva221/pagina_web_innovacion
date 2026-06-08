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

// Validar fecha y hora mínimas (no puede ser en el pasado)
function validarFechaHora(fechaHora) {
  const fechaSeleccionada = new Date(fechaHora);
  const ahora = new Date();
  
  return fechaSeleccionada > ahora;
}

// Manejar envío del formulario
solicitarServicioForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const rut = document.getElementById('rut').value.trim();
  const carrera = document.getElementById('carrera').value;
  const fechaHora = document.getElementById('fechaHora').value;
  const privacidad = document.getElementById('privacidad').checked;
  
  // Validaciones
  if (!nombre || !email || !rut || !carrera || !fechaHora) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }
  
  if (!validarRUT(rut)) {
    alert('El RUT ingresado no es válido. Por favor, verifica el formato.');
    return;
  }
  
  if (!validarFechaHora(fechaHora)) {
    alert('La fecha y hora debe ser posterior a la actual.');
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
    fechaHora,
    comentarios: document.getElementById('comentarios').value || null,
    marketing: document.getElementById('marketing').checked,
    fechaSolicitud: new Date().toISOString()
  };
  
  // Guardar en localStorage
  const solicitudes = JSON.parse(localStorage.getItem('solicitudesServicio')) || [];
  solicitudes.push(datosServicio);
  localStorage.setItem('solicitudesServicio', JSON.stringify(solicitudes));
  
  // Convertir a formato legible
  const fechaObj = new Date(fechaHora);
  const fechaFormato = fechaObj.toLocaleDateString('es-CL');
  const horaFormato = fechaObj.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  
  // Mensaje de éxito
  alert(`¡Solicitud enviada con éxito!\n\nNombre: ${nombre}\nFecha: ${fechaFormato}\nHora: ${horaFormato}\n\nNos pondremos en contacto pronto en ${email}.`);
  
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

// Establecer fecha y hora mínima en el input
document.addEventListener('DOMContentLoaded', () => {
  const fechaHoraInput = document.getElementById('fechaHora');
  const ahora = new Date();
  
  // Agregar 30 minutos a la hora actual
  ahora.setMinutes(ahora.getMinutes() + 30);
  
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const día = String(ahora.getDate()).padStart(2, '0');
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minuto = String(ahora.getMinutes()).padStart(2, '0');
  
  const fechaHoraMinima = `${año}-${mes}-${día}T${hora}:${minuto}`;
  
  fechaHoraInput.min = fechaHoraMinima;
  fechaHoraInput.value = fechaHoraMinima;
});
