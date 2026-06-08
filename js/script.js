const registerModal = document.getElementById('registerModal');
    const officialPage = document.getElementById('officialPage');
    const openRegister = document.getElementById('openRegister');
    const accountBtn = document.getElementById('accountBtn');

    // Mostrar la página oficial por defecto (registro opcional)
    officialPage.classList.add('active');

    // Abrir modal desde botón de inscripción
    openRegister.addEventListener('click', () => {
      registerModal.classList.remove('hide');
    });

    // Ir a registro desde botón de cuenta
    accountBtn.addEventListener('click', () => {
      // Verificar si hay usuario registrado en localStorage
      const datosEstudiante = localStorage.getItem('datosEstudiante');
      if (datosEstudiante) {
        const datos = JSON.parse(datosEstudiante);
        alert(`Bienvenido de vuelta, ${datos.nombre}!`);
      } else {
        window.location.href = 'registro.html';
      }
    });

    // Cerrar modal al hacer clic fuera
    registerModal.addEventListener('click', (e) => {
      if (e.target === registerModal) {
        registerModal.classList.add('hide');
      }
    });

    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.backgroundPosition = `${x}% ${y}%`;
    });
    

    