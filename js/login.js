document.addEventListener('DOMContentLoaded', () => {
  const NOMBRE_USUARIO = 'admin123';
  const CONTRASENA = '12345';

  const loginForm = document.getElementById('loginForm');
  const loginModal = document.getElementById('loginModal');

  const botonCerrarSesion = document.getElementById('botonCerrarSesion');

  const usuarioLogin = localStorage.getItem('usuarioLogin');

  if (usuarioLogin !== 'true') {
    const modal = new bootstrap.Modal(loginModal, {
      backdrop: 'static',
      keyboard: false,
    });
    botonCerrarSesion.classList.add('d-none');
    modal.show();
  } else {
    botonCerrarSesion.classList.remove('d-none');
  }

  if (loginForm) {
    const loginUsuario = document.getElementById('loginUsuario');
    const loginContrasena = document.getElementById('loginContrasena');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usuario = loginUsuario.value.trim();
      const contra = loginContrasena.value.trim();

      if (usuario === NOMBRE_USUARIO && contra === CONTRASENA) {
        console.log('Login exitoso');
        localStorage.setItem('usuarioLogin', 'true');

        const modal = bootstrap.Modal.getInstance(loginModal);
        if (modal) {
          modal.hide();
        }

        alert('Sesión iniciada');
        window.location.reload();
      } else {
        const loginErrorContenedor = document.getElementById(
          'loginErrorContenedor'
        );
        loginErrorContenedor.innerHTML = `<div class="alert alert-danger">Usuario o contraseña incorrectos.</div>`;
      }
    });
  }

  botonCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogin');

    alert('Sesión cerrada');
    window.location.reload();
  });
});
