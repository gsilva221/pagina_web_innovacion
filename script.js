const registerModal = document.getElementById('registerModal');
    const registerForm = document.getElementById('registerForm');
    const officialPage = document.getElementById('officialPage');
    const openRegister = document.getElementById('openRegister');

    openRegister.addEventListener('click', () => {
      registerModal.classList.remove('hide');
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
      officialPage.classList.add('active');
      window.location.hash = 'oficial';
      const heading = document.querySelector('main h2');
      if (heading) {
        heading.textContent = `Bienvenido ${name} a la página oficial de Nexovocacional`;
      }
    });

    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.backgroundPosition = `${x}% ${y}%`;
    });
    

    