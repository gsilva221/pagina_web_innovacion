const registerModal = document.getElementById('registerModal');
    const registerForm = document.getElementById('registerForm');
    const officialPage = document.getElementById('officialPage');
    const openRegister = document.getElementById('openRegister');
    const accountBtn = document.getElementById('accountBtn');

    // Mostrar la página oficial por defecto (registro opcional)
    officialPage.classList.add('active');

    // Abrir modal desde botón de inscripción
    openRegister.addEventListener('click', () => {
      registerModal.classList.remove('hide');
    });

    // Abrir modal desde botón de cuenta
    accountBtn.addEventListener('click', () => {
      registerModal.classList.remove('hide');
    });

    // Cerrar modal al hacer clic fuera
    registerModal.addEventListener('click', (e) => {
      if (e.target === registerModal) {
        registerModal.classList.add('hide');
      }
    });

    registerForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const phone = formData.get('phone').trim();

      if (!name || !email || !phone) {
        alert('Por favor, completa todos los campos para continuar.');
        return;
      }

      registerModal.classList.add('hide');
      const heading = document.querySelector('main h2');
      if (heading) {
        heading.textContent = `Bienvenido ${name} a Nexovocacional`;
      }
    });

    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.backgroundPosition = `${x}% ${y}%`;
    });
    

    