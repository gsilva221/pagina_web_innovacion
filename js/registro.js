const registroForm = document.getElementById('registroForm');
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

// Validar edad mínima (14 años)
function validarEdad(fecha) {
  const hoy = new Date();
  const nacimiento = new Date(fecha);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad >= 14;
}

// Manejar envío del formulario
registroForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const rut = document.getElementById('rut').value.trim();
  const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
  const nivel = document.getElementById('nivel').value;
  const establecimiento = document.getElementById('establecimiento').value.trim();
  const areaInteres = document.querySelector('input[name="area_interes"]:checked');
  const privacidad = document.getElementById('privacidad').checked;
  
  // Validaciones
  if (!nombre || !email || !telefono || !rut || !fechaNacimiento || !nivel || !establecimiento) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }
  
  if (!validarRUT(rut)) {
    alert('El RUT ingresado no es válido. Por favor, verifica el formato.');
    return;
  }
  
  if (!validarEdad(fechaNacimiento)) {
    alert('Debes tener al menos 14 años para registrarte.');
    return;
  }
  
  if (!areaInteres) {
    alert('Por favor, selecciona un área de interés.');
    return;
  }
  
  if (!privacidad) {
    alert('Debes aceptar la política de privacidad para continuar.');
    return;
  }
  
  // Aquí puedes enviar los datos a un servidor
  const datosRegistro = {
    nombre,
    email,
    telefono,
    rut,
    fechaNacimiento,
    nivel,
    establecimiento,
    promedio: document.getElementById('promedio').value || null,
    areaInteres: areaInteres.value,
    habilidades: document.getElementById('habilidades').value || null,
    contacto: document.getElementById('contacto').checked,
    fechaRegistro: new Date().toISOString()
  };
  
  // Guardar en localStorage como ejemplo
  localStorage.setItem('datosEstudiante', JSON.stringify(datosRegistro));
  
  // Mostrar mensaje de éxito
  alert(`¡Bienvenido ${nombre}! Tu registro ha sido completado exitosamente.\n\nNos pondremos en contacto pronto en ${email}.`);
  
  // Redirigir al inicio
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
});

// Botón de cuenta
accountBtn.addEventListener('click', () => {
  // Verificar si hay usuario registrado
  const datosEstudiante = localStorage.getItem('datosEstudiante');
  if (datosEstudiante) {
    const datos = JSON.parse(datosEstudiante);
    alert(`Bienvenido de vuelta, ${datos.nombre}!\n\nEmail: ${datos.email}`);
  } else {
    window.location.href = 'registro.html';
  }
});
